import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export default function ScanPlaceholder() {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <MaterialDesignIcons color="#0878c9" name="qrcode-scan" size={40} />
            </View>
            <Text style={styles.title}>No scans yet</Text>
            <Text style={styles.message}>Tap the scan button to capture your first QR code.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        maxWidth: 320,
        paddingHorizontal: 24,
        paddingTop: 120,
    },
    iconContainer: {
        alignItems: 'center',
        backgroundColor: '#e6f3fb',
        borderRadius: 36,
        height: 72,
        justifyContent: 'center',
        marginBottom: 20,
        width: 72,
    },
    message: { color: '#64748b', fontSize: 16, lineHeight: 23, textAlign: 'center' },
    title: {
        color: '#0f172a',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 8,
    },
});
