import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

import NewScanButton from '../components/NewScanButton';
import { AppState, ScanStackParamList } from '../types';
import ScanRecordListItem from '../components/ScanRecordListItem';
import ScanHistoryActions from '../components/ScanHistoryActions';
import ScanPlaceholder from '../components/ScanPlaceholder';

interface Props extends StackScreenProps<ScanStackParamList, 'ScanHistory'> {}

export default function ScanHistoryScreen(props: Props) {
    const { navigation, route } = props;
    const dispatch = useDispatch();

    // current scans in Redux
    const selectScans = (state: AppState) => state.scans;
    const currentScans = useSelector(selectScans);

    // save selected scan Ids in route params
    const selectedScanIds = route.params?.selectedScanIds || [];
    const setSelectedScans = (ids: number[]) => navigation.setParams({ selectedScanIds: ids });

    // toggle to allow multi-select instead of opening links on tap
    const selectMode = selectedScanIds.length > 0;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ScanHistoryActions
                    dispatch={dispatch}
                    navigation={navigation}
                    selectedScanIds={selectedScanIds}
                    selectMode={selectMode}
                />
            ),
        });
    }, [navigation, selectedScanIds, selectMode]);

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
            <ScrollView>
                {currentScans?.length ? (
                    currentScans.map((item, index) => (
                        <ScanRecordListItem
                            key={index}
                            isSelected={selectedScanIds.indexOf(item.id) > -1}
                            scanRecord={item}
                            selectMode={selectMode}
                            toggleSelected={toggleSelection}
                        />
                    ))
                ) : (
                    <ScanPlaceholder />
                )}
            </ScrollView>
            <NewScanButton onPress={() => props.navigation.navigate('Scan')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
