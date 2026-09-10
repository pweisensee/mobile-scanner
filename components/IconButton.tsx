import {
    MaterialDesignIcons,
    MaterialDesignIconsIconName,
} from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

type Props = {
    accessibilityLabel: string;
    color?: string;
    filled?: boolean;
    name: MaterialDesignIconsIconName;
    onPress: () => void;
    size?: number;
    style?: ViewStyle;
};

export default function IconButton({
    accessibilityLabel,
    color = '#334155',
    filled = false,
    name,
    onPress,
    size = 24,
    style,
}: Props) {
    return (
        <Pressable
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            hitSlop={8}
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                filled && styles.filled,
                pressed && styles.pressed,
                style,
            ]}
        >
            <MaterialDesignIcons color={filled ? '#ffffff' : color} name={name} size={size} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 24,
        height: 44,
        justifyContent: 'center',
        width: 44,
    },
    filled: {
        backgroundColor: '#0878c9',
        elevation: 4,
        shadowColor: '#0f172a',
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    pressed: {
        opacity: 0.65,
        transform: [{ scale: 0.97 }],
    },
});
