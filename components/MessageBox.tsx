import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

export default function MessageBox({ error, message }: { message: string; error?: boolean }) {
    return (
        <View style={error ? styles.errorContainer : styles.messageContainer}>
            <Text>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: 'rgba(219, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    messageContainer: {
        backgroundColor: '#61616155',
        color: Colors.light.text,
        padding: 10,
        borderRadius: 5,
    },
});
