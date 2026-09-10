import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

export default function MessageBox({ error, message }: { message: string; error?: boolean }) {
    return (
        <View style={error ? styles.errorContainer : styles.messageContainer}>
            <Text style={error ? styles.errorText : styles.messageText}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: '#fee2e2',
        borderColor: '#fecaca',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 14,
        padding: 12,
    },
    errorText: { color: '#991b1b', lineHeight: 20 },
    messageContainer: {
        backgroundColor: '#ffffff',
        borderColor: '#e2e8f0',
        borderRadius: 10,
        borderWidth: 1,
        padding: 14,
    },
    messageText: { color: Colors.light.text, lineHeight: 21 },
});
