import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from '@rneui/themed';
import { StackScreenProps } from '@react-navigation/stack';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { canOpenURL } from 'expo-linking';
import Toast from 'react-native-toast-message';

import { ScanStackParamList, ScanRecord } from '../types';
import { addScan } from '../modules/appSlice';

interface Props extends StackScreenProps<ScanStackParamList, 'Scan'> {}

export default function ScanScreen(props: Props) {
    const [scanned, setScanned] = useState(false);
    const [cameraType, setCameraType] = useState<CameraType>('back');

    const [permission, requestPermission] = useCameraPermissions();

    const dispatch = useDispatch();
    const saveScan = (newScan: ScanRecord) => dispatch(addScan(newScan));

    const handleBarCodeScanned = async ({ type, data }: BarcodeScanningResult) => {
        setScanned(true);
        saveScan({ data, id: Date.now(), isLink: await canOpenURL(data), type });
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
            <View>
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <CameraView
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                facing={cameraType}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.buttonContainer}>
                {scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
                )}
                {!scanned && (
                    <Button
                        buttonStyle={styles.flipButton}
                        icon={{ color: 'white', name: 'flip-camera-android', type: 'material' }}
                        onPress={() => {
                            setCameraType(cameraType === 'back' ? 'front' : 'back');
                        }}
                        title={'Flip'}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        bottom: 100,
        position: 'absolute',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipButton: { paddingVertical: 10, paddingHorizontal: 20 },
});
