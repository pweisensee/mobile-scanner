import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as MailComposer from 'expo-mail-composer';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { z } from 'zod';
import Toast from 'react-native-toast-message';

import { RootStackParamList } from '../types';
import Separator from '../components/Separator';
import Colors from '../constants/Colors';
import MessageBox from '../components/MessageBox';
import PrimaryButton from '../components/PrimaryButton';
import { useScanStore } from '../modules/ScanStore';

type Props = NativeStackScreenProps<RootStackParamList, 'SendEmail'>;

export default function EmailScreen(props: Props) {
    const { route, navigation } = props;
    const { scans } = useScanStore();

    const selectedScanIds = route.params?.selectedScanIds || [];
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [composing, setComposing] = useState(false);
    const [mailAvailable, setMailAvailable] = useState<boolean | null>(null);
    const [toAddress, setToAddress] = useState<string>('');
    const body = scans
        .filter((scan) => selectedScanIds.indexOf(scan.id) > -1)
        .map((scanRecord) => scanRecord.data)
        .join('\n\n');

    useEffect(() => {
        MailComposer.isAvailableAsync().then(setMailAvailable).catch(() => setMailAvailable(false));
    }, []);

    const validateAndSendEmail = async () => {
        const recipient = toAddress.trim();
        if (!z.email().safeParse(recipient).success || !body.length) {
            setErrorMessage('Enter a valid email address and select at least one scan.');
            return;
        }

        setComposing(true);
        setErrorMessage('');

        try {
            if (mailAvailable) {
                const result = await MailComposer.composeAsync({
                    body,
                    recipients: [recipient],
                    subject: 'QR Scan Contents',
                });

                if (result.status === MailComposer.MailComposerStatus.SENT) {
                    navigation.navigate('ScanHistory', { selectedScanIds: [] });
                    Toast.show({ type: 'success', text1: 'Email sent' });
                } else if (result.status === MailComposer.MailComposerStatus.SAVED) {
                    Toast.show({ type: 'info', text1: 'Draft saved' });
                }
            } else {
                await Share.share({
                    message: `To: ${recipient}\n\n${body}`,
                    title: 'QR Scan Contents',
                });
            }
        } catch {
            setErrorMessage('Unable to open an email or sharing app. Please try again.');
        } finally {
            setComposing(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <Text style={styles.label}>Recipient</Text>
                <TextInput
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    onChangeText={setToAddress}
                    placeholder="name@example.com"
                    style={styles.emailInput}
                    value={toAddress}
                />
                {errorMessage.length ? <MessageBox error={true} message={errorMessage} /> : null}
                {mailAvailable === false ? (
                    <Text style={styles.hint}>
                        No mail account is available, so the system share sheet will open instead.
                    </Text>
                ) : null}
                <PrimaryButton
                    disabled={mailAvailable === null}
                    icon={mailAvailable === false ? 'share-variant-outline' : 'email-outline'}
                    loading={composing}
                    onPress={validateAndSendEmail}
                    title={mailAvailable === false ? 'Share scans' : 'Compose email'}
                />

                <Separator />
                <Text style={styles.title}>Email Contents:</Text>
                <MessageBox message={body} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#f8fafc', flex: 1 },
    emailInput: {
        backgroundColor: '#ffffff',
        borderColor: '#cbd5e1',
        borderRadius: 10,
        borderWidth: 1,
        color: '#0f172a',
        fontSize: 16,
        marginBottom: 12,
        minHeight: 50,
        paddingHorizontal: 14,
    },
    hint: { color: '#64748b', fontSize: 13, lineHeight: 19, marginBottom: 14 },
    label: { color: '#334155', fontSize: 14, fontWeight: '700', marginBottom: 8 },
    scrollContainer: { padding: 24 },
    title: {
        color: Colors.light.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
