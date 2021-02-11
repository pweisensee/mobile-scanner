import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Separator() {
    return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
        color: '#eee',
    },
});
