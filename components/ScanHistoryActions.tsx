import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import IconButton from './IconButton';

type Props = {
    onCancel: () => void;
    onDelete: () => void;
    onEmail: () => void;
    selectedScanIds: number[];
};

export default function ScanHistoryActions(props: Props) {
    const { onCancel, onDelete, onEmail, selectedScanIds } = props;

    const confirmDelete = () => {
        Alert.alert(
            `Delete ${selectedScanIds.length} ${selectedScanIds.length === 1 ? 'scan' : 'scans'}?`,
            'This cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: onDelete },
            ]
        );
    };

    return (
        <View style={styles.rowContainer}>
            {selectedScanIds.length > 0 ? (
                <>
                    <IconButton
                        accessibilityLabel="Cancel selection"
                        name="close"
                        onPress={() => {
                            onCancel();
                            Toast.show({
                                type: 'info',
                                text1: 'Selection cleared',
                                visibilityTime: 2500,
                            });
                        }}
                    />
                    <IconButton
                        accessibilityLabel={`Delete ${selectedScanIds.length} selected scans`}
                        color="#dc2626"
                        name="delete-outline"
                        onPress={confirmDelete}
                    />
                    <IconButton
                        accessibilityLabel={`Email ${selectedScanIds.length} selected scans`}
                        color="#0878c9"
                        name="send-outline"
                        onPress={() => {
                            Toast.hide();
                            onEmail();
                        }}
                    />
                </>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
    },
});
