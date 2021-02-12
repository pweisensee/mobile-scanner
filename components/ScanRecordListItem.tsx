import React from 'react';
import { openURL } from 'expo-linking';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ago from 's-ago';

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

    const dateAgo = ago(new Date(id));

    return (
        <ListItem bottomDivider style={{ flex: 10 }}>
            <ListItem.CheckBox checked={isSelected} onPress={() => toggleSelected(id)} />
            <TouchableOpacity onPress={onPress()} containerStyle={{ flex: 8 }}>
                <ListItem.Content>
                    <ListItem.Title style={isLink ? styles.title : { color: Colors.light.text }}>
                        {data}
                    </ListItem.Title>
                    <ListItem.Subtitle>{dateAgo}</ListItem.Subtitle>
                </ListItem.Content>
            </TouchableOpacity>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    title: { color: 'blue', textDecorationLine: 'underline' },
});
