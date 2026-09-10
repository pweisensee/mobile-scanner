import React from 'react';
import { openURL } from 'expo-linking';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import Toast from 'react-native-toast-message';

import { ScanRecord } from '../types';
import Colors from '../constants/Colors';

type Props = {
    isSelected: boolean;
    scanRecord: ScanRecord;
    selectMode: boolean;
    toggleSelected: (id: number) => void;
};

export default function ScanRecordListItem(props: Props) {
    const { isSelected, scanRecord, selectMode, toggleSelected } = props;
    const { data, id, isLink } = scanRecord;

    const onPress = async () => {
        if (selectMode) {
            toggleSelected(id);
        } else if (isLink) {
            try {
                await openURL(data);
            } catch {
                Toast.show({ type: 'error', text1: 'Unable to open this link' });
            }
        } else {
            toggleSelected(id);
        }
    };

    const dateAgo = formatDistanceToNow(new Date(id), { addSuffix: true });

    return (
        <Pressable
            accessibilityHint={isLink && !selectMode ? 'Opens the scanned link' : 'Selects this scan'}
            accessibilityRole={isLink && !selectMode ? 'link' : 'button'}
            onLongPress={() => toggleSelected(id)}
            onPress={onPress}
            style={({ pressed }) => [styles.container, isSelected && styles.selected, pressed && styles.pressed]}
        >
            <MaterialDesignIcons
                color={isSelected ? Colors.light.primary : '#94a3b8'}
                name={isSelected ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                size={26}
            />
            <View style={styles.content}>
                <Text numberOfLines={3} style={[styles.title, isLink && styles.link]}>
                    {data}
                </Text>
                <Text style={styles.subtitle}>{dateAgo}</Text>
            </View>
            {isLink && !selectMode ? (
                <MaterialDesignIcons color="#94a3b8" name="open-in-new" size={20} />
            ) : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderBottomColor: '#e2e8f0',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        gap: 14,
        minHeight: 78,
        paddingHorizontal: 18,
        paddingVertical: 14,
    },
    content: { flex: 1, gap: 5 },
    link: { color: '#0878c9' },
    pressed: { backgroundColor: '#f1f5f9' },
    selected: { backgroundColor: '#eff8ff' },
    subtitle: { color: '#64748b', fontSize: 13 },
    title: { color: Colors.light.text, fontSize: 16, lineHeight: 22 },
});
