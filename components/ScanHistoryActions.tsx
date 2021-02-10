import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Dispatch } from 'redux';

import { removeScans } from '../modules/actions';

type Props = {
    dispatch: Dispatch<any>;
    navigation: any;
    selectedScanIds: number[];
    selectMode: boolean;
};

export default function ScanHistoryActions(props: Props) {
    const { dispatch, navigation, selectedScanIds, selectMode } = props;

    // delete scans from redux
    const deleteScans = () => dispatch(removeScans(selectedScanIds));

    return (
        <View style={styles.rowContainer}>
            {selectMode ? (
                <>
                    <Button
                        containerStyle={[{ paddingRight: 10 }]}
                        type="outline"
                        onPress={() =>
                            navigation.setParams({ selectedScanIds: [], selectMode: false })
                        }
                        title="Cancel"
                    />
                    {selectedScanIds.length ? (
                        <>
                            <Button
                                buttonStyle={[{ backgroundColor: 'red' }]}
                                icon={{
                                    color: 'white',
                                    name: 'delete-forever',
                                    type: 'material-community',
                                }}
                                onPress={deleteScans}
                                title="Delete"
                            />
                            <Button
                                containerStyle={[{ marginHorizontal: 10 }]}
                                icon={{
                                    color: 'white',
                                    name: 'email-outline',
                                    type: 'material-community',
                                }}
                                onPress={() => navigation.navigate('Email', { selectedScanIds })}
                                title="Email"
                            />
                        </>
                    ) : null}
                </>
            ) : (
                <Button
                    buttonStyle={[{ paddingHorizontal: 15 }]}
                    containerStyle={[{ paddingRight: 10 }]}
                    icon={{ color: 'white', name: 'playlist-edit', type: 'material-community' }}
                    onPress={() => navigation.setParams({ selectMode: true })}
                    title="Edit"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
