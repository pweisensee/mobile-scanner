import { StackScreenProps } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Input } from 'react-native-elements';
import isEmail from 'validator/lib/isEmail';
import Toast from 'react-native-easy-toast';

import { Text, View } from '../components/Themed';
import { AppState, ScanStackParamList } from '../types';
import Separator from '../components/Separator';
import { sendGridEmail } from '../modules/sendgrid';

const SUBJECT = 'QR Scan Contents';

interface Props extends StackScreenProps<ScanStackParamList, 'Email'> {}

export default function EmailScreen(props: Props) {
    const toastRef = useRef<Toast>(null);
    const { route } = props;

    // current scans in Redux
    const selectScans = (state: AppState) => state.scans;
    const currentScans = useSelector(selectScans);

    // save selected scan Ids in route params
    const selectedScanIds = route.params?.selectedScanIds || [];
    // customize to email address
    const [errorMessage, setErrorMessage] = useState<string>('');
    // customize to email address
    const [toAddress, setToAddress] = useState<string>('');
    const body = currentScans
        .filter((scan) => selectedScanIds.indexOf(scan.id) > -1)
        .map((scanRecord) => scanRecord.data)
        .join('\n\n');

    const sendEmail = async () => {
        if (isEmail(toAddress) && body.length) {
            setErrorMessage('');
            const success = await sendGridEmail(toAddress, SUBJECT, body);
            if (success) {
                toastRef.current?.show('Success! Email sent.', 5000);
            } else {
                setErrorMessage('Whoops! There was an issue sending that email. Try again later.');
            }
        } else {
            setErrorMessage(`Invalid email address or contents.`);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Input
                    containerStyle={[{ marginTop: 20 }]}
                    keyboardType="email-address"
                    label="Email address"
                    onChangeText={setToAddress}
                />
                {errorMessage.length ? <Message error={true} message={errorMessage} /> : null}
                <Button
                    icon={{ color: 'white', name: 'send', type: 'font-awesome' }}
                    title="Send Email"
                    onPress={sendEmail}
                />

                <Separator />

                <Text style={[styles.title]}>Email Contents:</Text>

                <Message message={body} />
                <Toast
                    fadeInDuration={250}
                    opacity={0.95}
                    position="top"
                    ref={toastRef}
                    // @ts-ignore
                    style={styles.toast}
                />
            </ScrollView>
        </View>
    );
}

function Message({ error, message }: { message: string; error?: boolean }) {
    return (
        <View style={error ? styles.errorContainer : styles.messageContainer}>
            <Text>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    errorContainer: {
        backgroundColor: 'rgba(219, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    messageContainer: { backgroundColor: '#61616155', padding: 10, borderRadius: 5 },
    scrollContainer: { paddingHorizontal: 30 },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    toast: { backgroundColor: '#23af58', padding: 25 },
});
