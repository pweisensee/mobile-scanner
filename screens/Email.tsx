import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Input } from '@rneui/themed';
import { z } from 'zod';
import Toast from 'react-native-toast-message';

import { AppState, ScanStackParamList, BottomTabsParamList } from '../types';
import Separator from '../components/Separator';
import Colors from '../constants/Colors';
import { sendEmail } from '../modules/appSlice';
import MessageBox from '../components/MessageBox';
import { AppDispatch, RootState } from '../modules/store';

type Props = CompositeScreenProps<
    StackScreenProps<ScanStackParamList, 'SendEmail'>,
    BottomTabScreenProps<BottomTabsParamList>
>;

export default function EmailScreen(props: Props) {
    const { route, navigation } = props;
    const dispatch = useDispatch<AppDispatch>();
    const dispatchSendEmail = async (toEmail: string, content: string) =>
        dispatch(sendEmail(toEmail, content));

    // current scans in Redux
    const selectScans = (state: RootState) => state.scans;
    const currentScans = useSelector(selectScans);

    // save selected scan Ids in route params
    const selectedScanIds = route.params?.selectedScanIds || [];
    // customize to email address
    const [errorMessage, setErrorMessage] = useState<string>('');
    // customize to email address
    const [emailSending, setEmailSending] = useState<boolean>(false);
    // customize to email address
    const [toAddress, setToAddress] = useState<string>('');
    const body = currentScans
        .filter((scan) => selectedScanIds.indexOf(scan.id) > -1)
        .map((scanRecord) => scanRecord.data)
        .join('\n\n');

    const onSendEmail = async () => {
        setEmailSending(true);
        const success: boolean = await dispatchSendEmail(toAddress, body);
        setEmailSending(false);

        console.log(`dispatchSendEmail success? ${typeof success} ${JSON.stringify(success)}`);

        if (success) {
            // blow out selected scans
            setErrorMessage('');
            // @ts-ignore
            navigation.navigate('Scan', {
                screen: 'ScanHistory',
                params: { selectedScanIds: [] },
            });
            // @ts-ignore
            navigation.navigate('Email', { screen: 'EmailHistory' });
            Toast.show({
                type: 'success',
                text1: 'Success! Email sent.',
                text2: 'Pull to refresh and get the latest email activity.',
                visibilityTime: 5000,
            });
        } else {
            setErrorMessage('Whoops! There was an issue sending that email. Try again later.');
        }
    };

    const validateAndSendEmail = async () => {
        const isEmail = z.email().safeParse(toAddress).success;
        if (isEmail && body.length) {
            onSendEmail();
        } else {
            setErrorMessage(`Invalid email address or contents.`);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Input
                    containerStyle={styles.emailInput}
                    keyboardType="email-address"
                    label="Email address"
                    onChangeText={setToAddress}
                />
                {errorMessage.length ? <MessageBox error={true} message={errorMessage} /> : null}
                <Button
                    disabled={emailSending}
                    loading={emailSending}
                    icon={{ color: 'white', name: 'send', type: 'font-awesome' }}
                    onPress={validateAndSendEmail}
                    title={'Send Email'}
                />

                <Separator />
                <Text style={styles.title}>Email Contents:</Text>
                <MessageBox message={body} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    emailInput: { marginTop: 20 },
    scrollContainer: { paddingHorizontal: 30 },
    title: {
        color: Colors.light.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
