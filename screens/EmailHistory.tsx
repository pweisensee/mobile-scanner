import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { EmailStackParamList } from '../types';

interface Props extends StackScreenProps<EmailStackParamList, 'EmailHistory'> {}

export default function EmailHistoryScreen(props: Props) {
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginVertical: 50 }}>
                <Text style={styles.title}>No emails yet. Check back later. </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
