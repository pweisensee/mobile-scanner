import React from 'react';
import { openURL } from 'expo-linking';
import { StyleSheet, View } from 'react-native';
import { colors, Icon, ListItem } from 'react-native-elements';

import { ScanRecord } from '../types';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            // links should open, when not in select mode
            return () => openURL(data);
        } else {
            // if an item isn't a link, enable multi-selection when tapping the text
            return () => toggleSelected(id);
        }
    };

    return (
        <ListItem
            bottomDivider
            style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'red', width: '100%' }}
        >
            <ListItem.CheckBox
                style={{ flex: 1 }}
                checked={isSelected}
                onPress={() => toggleSelected(id)}
            />
            <TouchableOpacity onPress={onPress()}>
                <ListItem.Content style={{ backgroundColor: 'green', flex: 8 }}>
                    <ListItem.Title style={isLink ? styles.title : undefined}>
                        {data}
                    </ListItem.Title>
                    <ListItem.Subtitle>{new Date(id).toLocaleString()}</ListItem.Subtitle>
                </ListItem.Content>
            </TouchableOpacity>
            <Icon
                style={{ flex: 1 }}
                name="share"
                type="entypo"
                onPress={() => toggleSelected(id)}
            />
        </ListItem>
    );
}

const styles = StyleSheet.create({
    title: { color: 'blue', textDecorationLine: 'underline' },
});
