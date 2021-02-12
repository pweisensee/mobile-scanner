import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

type Props = {
    onPress: () => void;
};

export default function NewScanButton({ onPress }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Icon
                    name="qrcode-scan"
                    onPress={onPress}
                    raised
                    reverse
                    type="material-community"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
    },
    rowContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
