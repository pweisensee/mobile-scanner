import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, use, useEffect, useMemo, useState } from 'react';

import { ScanRecord } from '../types';

const SCANS_STORAGE_KEY = '@mobile-scanner/scans/v1';
const LEGACY_REDUX_STORAGE_KEY = 'persist:root';

type ScanStoreValue = {
    addScan: (scan: ScanRecord) => void;
    hydrated: boolean;
    removeScans: (scanIds: number[]) => void;
    scans: ScanRecord[];
};

const ScanStoreContext = createContext<ScanStoreValue | null>(null);

function isScanRecord(value: unknown): value is ScanRecord {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const scan = value as Partial<ScanRecord>;
    return (
        typeof scan.data === 'string' &&
        typeof scan.id === 'number' &&
        typeof scan.isLink === 'boolean' &&
        typeof scan.type === 'string'
    );
}

function parseScans(value: string | null): ScanRecord[] | null {
    if (!value) {
        return null;
    }

    try {
        const parsed: unknown = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.filter(isScanRecord) : null;
    } catch {
        return null;
    }
}

async function loadScans(): Promise<ScanRecord[]> {
    const currentScans = parseScans(await AsyncStorage.getItem(SCANS_STORAGE_KEY));
    if (currentScans) {
        return currentScans;
    }

    const legacyState = await AsyncStorage.getItem(LEGACY_REDUX_STORAGE_KEY);
    if (!legacyState) {
        return [];
    }

    try {
        const parsedLegacyState = JSON.parse(legacyState) as { scans?: unknown };
        const legacyScans = parseScans(
            typeof parsedLegacyState.scans === 'string'
                ? parsedLegacyState.scans
                : JSON.stringify(parsedLegacyState.scans)
        );

        if (legacyScans) {
            await AsyncStorage.setItem(SCANS_STORAGE_KEY, JSON.stringify(legacyScans));
            return legacyScans;
        }
    } catch {
        // Ignore unreadable legacy state and start with an empty history.
    }

    return [];
}

async function persistScans(scans: ScanRecord[]): Promise<void> {
    try {
        await AsyncStorage.setItem(SCANS_STORAGE_KEY, JSON.stringify(scans));
    } catch (error) {
        console.warn('Unable to persist scan history.', error);
    }
}

export function ScanStoreProvider({ children }: React.PropsWithChildren) {
    const [hydrated, setHydrated] = useState(false);
    const [scans, setScans] = useState<ScanRecord[]>([]);

    useEffect(() => {
        let mounted = true;

        loadScans()
            .then((storedScans) => {
                if (mounted) {
                    setScans(storedScans);
                }
            })
            .catch((error) => {
                console.warn('Unable to load scan history.', error);
            })
            .finally(() => {
                if (mounted) {
                    setHydrated(true);
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    const value = useMemo<ScanStoreValue>(
        () => ({
            addScan: (scan) => {
                setScans((currentScans) => {
                    const nextScans = [scan, ...currentScans];
                    void persistScans(nextScans);
                    return nextScans;
                });
            },
            hydrated,
            removeScans: (scanIds) => {
                setScans((currentScans) => {
                    const nextScans = currentScans.filter((scan) => !scanIds.includes(scan.id));
                    void persistScans(nextScans);
                    return nextScans;
                });
            },
            scans,
        }),
        [hydrated, scans]
    );

    return <ScanStoreContext value={value}>{children}</ScanStoreContext>;
}

export function useScanStore(): ScanStoreValue {
    const store = use(ScanStoreContext);
    if (!store) {
        throw new Error('useScanStore must be used within ScanStoreProvider');
    }

    return store;
}
