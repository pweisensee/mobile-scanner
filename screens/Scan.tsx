import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { canOpenURL } from 'expo-linking';
import Toast from 'react-native-toast-message';

import { RootStackParamList, ScanRecord } from '../types';
import { useScanStore } from '../modules/ScanStore';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Scan'>;

export default function ScanScreen(props: Props) {
    const [scanned, setScanned] = useState(false);
    const [cameraType, setCameraType] = useState<CameraType>('back');
    const handlingScan = useRef(false);
    const { addScan } = useScanStore();

    const [permission, requestPermission] = useCameraPermissions();

    const handleBarCodeScanned = async ({ type, data }: BarcodeScanningResult) => {
        if (handlingScan.current) {
            return;
        }

        handlingScan.current = true;
        setScanned(true);
        let isLink = false;
        try {
            isLink = await canOpenURL(data);
        } catch {
            // Some valid QR contents use schemes that iOS cannot query.
        }

        const scan: ScanRecord = { data, id: Date.now(), isLink, type };
        addScan(scan);
        props.navigation.navigate('ScanHistory', { selectedScanIds: [] });

        Toast.show({
            type: 'success',
            text1: `New code scanned!`,
            text2: `${data.substring(0, 30)}${data.length > 30 ? `...` : ''}`,
            visibilityTime: 3000,
        });
    };

    if (!permission) {
        // Camera permissions are still loading.
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>Loading camera…</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionTitle}>Camera access is required</Text>
                <Text style={styles.permissionMessage}>
                    Mobile Scanner uses the camera only while you scan a QR code.
                </Text>
                <PrimaryButton onPress={requestPermission} title="Allow camera access" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <CameraView
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                facing={cameraType}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
            />
            <View style={styles.buttonContainer}>
                {scanned && (
                    <PrimaryButton
                        icon="qrcode-scan"
                        title="Scan again"
                        onPress={() => setScanned(false)}
                    />
                )}
                {!scanned && (
                    <PrimaryButton
                        icon="camera-flip-outline"
                        onPress={() => {
                            setCameraType(cameraType === 'back' ? 'front' : 'back');
                        }}
                        title="Flip camera"
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        bottom: 54,
        position: 'absolute',
        width: '80%',
    },
    centered: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: { color: '#475569', fontSize: 16 },
    permissionContainer: {
        backgroundColor: '#f8fafc',
        flex: 1,
        justifyContent: 'center',
        padding: 28,
    },
    permissionMessage: {
        color: '#64748b',
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 24,
        textAlign: 'center',
    },
    permissionTitle: {
        color: '#0f172a',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
    },
});
