import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@rneui/themed';

export default function ScanPlaceholder() {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>No scans yet.</Text>
            <Text style={styles.title}>Just tap below to start scanning!</Text>
            <Icon name="arrow-downward" size={40} type="material" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 0.5,
        justifyContent: 'space-evenly',
        marginVertical: 50,
    },
    message: { fontSize: 17 },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
