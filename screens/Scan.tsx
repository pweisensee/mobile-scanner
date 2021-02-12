import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { BarCodeEvent, BarCodeScanner, Constants as BarCodeConstants } from 'expo-barcode-scanner';
import { canOpenURL } from 'expo-linking';
import Toast from 'react-native-toast-message';

import { ScanStackParamList, ScanRecord } from '../types';
import { addScan } from '../modules/actions';

interface Props extends StackScreenProps<ScanStackParamList, 'Scan'> {}

export default function ScanScreen(props: Props) {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [cameraType, setCameraType] = useState(BarCodeConstants.Type.back);

    const dispatch = useDispatch();
    const saveScan = (newScan: ScanRecord) => dispatch(addScan(newScan));

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }: BarCodeEvent) => {
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

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                type={cameraType}
                barCodeTypes={[BarCodeConstants.BarCodeType.qr]}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.buttonContainer}>
                {scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
                )}
                {!scanned && (
                    <Button
                        buttonStyle={[styles.flipButton]}
                        icon={{ color: 'white', name: 'flip-camera-android', type: 'material' }}
                        onPress={() => {
                            setCameraType(
                                cameraType === BarCodeConstants.Type.back
                                    ? BarCodeConstants.Type.front
                                    : BarCodeConstants.Type.back
                            );
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
