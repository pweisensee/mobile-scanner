import {
    MaterialDesignIcons,
    MaterialDesignIconsIconName,
} from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
    disabled?: boolean;
    icon?: MaterialDesignIconsIconName;
    loading?: boolean;
    onPress: () => void;
    title: string;
};

export default function PrimaryButton({ disabled, icon, loading, onPress, title }: Props) {
    const unavailable = Boolean(disabled || loading);

    return (
        <Pressable
            accessibilityRole="button"
            disabled={unavailable}
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                unavailable && styles.disabled,
                pressed && !unavailable && styles.pressed,
            ]}
        >
            {loading ? (
                <ActivityIndicator color="#ffffff" />
            ) : (
                <View style={styles.content}>
                    {icon ? <MaterialDesignIcons color="#ffffff" name={icon} size={20} /> : null}
                    <Text style={styles.label}>{title}</Text>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#0878c9',
        borderRadius: 12,
        justifyContent: 'center',
        minHeight: 50,
        paddingHorizontal: 20,
        paddingVertical: 13,
    },
    content: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 9,
    },
    disabled: {
        opacity: 0.45,
    },
    label: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    pressed: {
        opacity: 0.78,
        transform: [{ scale: 0.99 }],
    },
});
