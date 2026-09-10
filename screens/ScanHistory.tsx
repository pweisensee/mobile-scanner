import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import NewScanButton from '../components/NewScanButton';
import { RootStackParamList } from '../types';
import ScanRecordListItem from '../components/ScanRecordListItem';
import ScanHistoryActions from '../components/ScanHistoryActions';
import ScanPlaceholder from '../components/ScanPlaceholder';
import { useScanStore } from '../modules/ScanStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ScanHistory'>;

export default function ScanHistoryScreen(props: Props) {
    const { navigation, route } = props;
    const { removeScans, scans } = useScanStore();

    // save selected scan Ids in route params
    const selectedScanIds = route.params?.selectedScanIds || [];
    const setSelectedScans = (ids: number[]) => navigation.setParams({ selectedScanIds: ids });

    // toggle to allow multi-select instead of opening links on tap
    const selectMode = selectedScanIds.length > 0;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ScanHistoryActions
                    onCancel={() => navigation.setParams({ selectedScanIds: [] })}
                    onDelete={() => {
                        removeScans(selectedScanIds);
                        navigation.setParams({ selectedScanIds: [] });
                        Toast.show({
                            type: 'success',
                            text1: `${selectedScanIds.length} ${selectedScanIds.length === 1 ? 'scan' : 'scans'} deleted`,
                        });
                    }}
                    onEmail={() => navigation.navigate('SendEmail', { selectedScanIds })}
                    selectedScanIds={selectedScanIds}
                />
            ),
        });
    }, [navigation, removeScans, selectedScanIds]);

    const toggleSelection = (id: number) => {
        const index = selectedScanIds.indexOf(id);

        // notify users about UI features only if they selected more items than previously selected
        if (selectedScanIds.length === 0 || index < 0) {
            Toast.show({
                type: 'info',
                text1: `${selectedScanIds.length + 1} item selected`,
                text2: 'Use the action buttons in the top right to delete or email',
                visibilityTime: 1500,
            });
        } else if (index > -1) {
            // item has been removed from selection, close toast to minimize confusion
            Toast.hide();
        }

        if (index < 0) {
            setSelectedScans([...selectedScanIds, id]);
        } else {
            setSelectedScans(selectedScanIds.filter((scanId) => scanId !== id));
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={scans.length ? styles.list : styles.emptyList}
                data={scans}
                keyExtractor={(item) => String(item.id)}
                ListEmptyComponent={ScanPlaceholder}
                renderItem={({ item }) => (
                    <ScanRecordListItem
                        isSelected={selectedScanIds.includes(item.id)}
                        scanRecord={item}
                        selectMode={selectMode}
                        toggleSelected={toggleSelection}
                    />
                )}
            />
            <NewScanButton onPress={() => props.navigation.navigate('Scan')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    emptyList: { flexGrow: 1 },
    list: { paddingBottom: 110 },
});
