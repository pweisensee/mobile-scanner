import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IconButton from './IconButton';

type Props = {
    onPress: () => void;
};

export default function NewScanButton({ onPress }: Props) {
    return (
        <View pointerEvents="box-none" style={styles.container}>
            <View style={styles.action}>
                <IconButton
                    accessibilityLabel="Scan a QR code"
                    filled
                    name="qrcode-scan"
                    onPress={onPress}
                    size={27}
                    style={styles.button}
                />
                <Text style={styles.label}>Scan</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 24,
        width: '100%',
        alignItems: 'center',
    },
    action: {
        alignItems: 'center',
        gap: 5,
    },
    button: { height: 58, width: 58, borderRadius: 29 },
    label: { color: '#334155', fontSize: 12, fontWeight: '600' },
});
