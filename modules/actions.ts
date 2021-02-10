// Nava Actions
import { Dispatch } from 'redux';

import { Action, ScanRecord } from '../types';

function resetStore(): Action {
    return { type: 'RESET_STORE' };
}

export function setError(error: string): Action {
    return { type: 'SET_ERROR', error };
}

export function setLoading(loading: boolean): Action {
    return { type: 'SET_LOADING', loading };
}

export function addScan(scan: ScanRecord): Action {
    return { type: 'ADD_SCAN', scan };
}

export function removeScans(scanIds: number[]): Action {
    return { type: 'REMOVE_SCANS', scanIds };
}
