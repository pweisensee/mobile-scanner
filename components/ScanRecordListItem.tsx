import React from 'react';
import { openURL } from 'expo-linking';
import { StyleSheet, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

import { ScanRecord } from '../types';

type Props = {
    isSelected: boolean;
    scanRecord: ScanRecord;
    selectMode: boolean;
    toggleSelected: (id: number) => void;
};

export default function ScanRecordListItem(props: Props) {
    const { isSelected, scanRecord, selectMode, toggleSelected } = props;
    const { data, id, isLink } = scanRecord;

    const onPress = (): undefined | (() => void) => {
        if (selectMode) {
            return () => toggleSelected(id);
        } else if (isLink) {
            return () => openURL(data);
        } else {
            return undefined;
        }
    };

    const leftIcon = () => {
        if (selectMode) {
            return <ListItem.CheckBox checked={isSelected} onPress={onPress()} />;
        } else if (isLink) {
            return <Icon name="open-outline" type="ionicon" />;
        } else {
            return null;
        }
    };

    return (
        <ListItem bottomDivider onPress={onPress()}>
            {leftIcon()}
            <ListItem.Content>
                <ListItem.Title style={isLink ? styles.title : undefined}>{data}</ListItem.Title>
                <ListItem.Subtitle>{new Date(id).toLocaleString()}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    title: { color: 'blue', textDecorationLine: 'underline' },
});
