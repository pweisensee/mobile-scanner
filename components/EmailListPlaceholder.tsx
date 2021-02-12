import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default function EmailListPlaceholder() {
    return (
        <View style={styles.container}>
            <Icon name="arrow-long-down" size={50} type="entypo" />
            <View style={styles.textContainer}>
                <Text style={styles.title}>No emails yet.</Text>
                <Text>Pull to refresh list</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: { alignItems: 'center', marginVertical: 50 },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
