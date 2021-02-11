import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Dispatch } from 'redux';
import Toast from 'react-native-toast-message';

import { removeScans } from '../modules/actions';
import Colors from '../constants/Colors';

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
                        containerStyle={[{ paddingHorizontal: 1 }]}
                        type="clear"
                        icon={{
                            color: Colors.light.text,
                            name: 'close',
                            type: 'material-community',
                        }}
                        onPress={() => {
                            navigation.setParams({ selectedScanIds: [], selectMode: false });
                            Toast.show({
                                text1: `All selections cancelled`,
                                visibilityTime: 2500,
                            });
                        }}
                    />
                    <Button
                        containerStyle={[{ paddingHorizontal: 1 }]}
                        type="clear"
                        icon={{
                            color: 'red',
                            name: 'delete-forever',
                            type: 'material-community',
                        }}
                        onPress={deleteScans}
                    />
                    <Button
                        containerStyle={[{ paddingHorizontal: 1, paddingRight: 10 }]}
                        type="clear"
                        icon={{
                            name: 'email-outline',
                            type: 'material-community',
                        }}
                        onPress={() => navigation.navigate('Email', { selectedScanIds })}
                    />
                </>
            ) : null}
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
