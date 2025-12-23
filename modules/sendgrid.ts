import * as Application from 'expo-application';
import { Platform } from 'react-native';
import { SENDGRID_API_KEY } from '@env';
import { EmailActivityResponse } from '../types';

const CONFIG = {
    ACTIVITY_URL: 'https://api.sendgrid.com/v3/messages',
    API_KEY: SENDGRID_API_KEY,
    FROM_EMAIL: 'team+sendgrid@synergetx.io',
    SEND_URL: 'https://api.sendgrid.com/v3/mail/send',
    SUBJECT: 'QR Scan Contents',
};

async function getInstallationId(): Promise<string | null> {
    if (Platform.OS === 'ios') {
        return await Application.getIosIdForVendorAsync();
    } else {
        return Application.getAndroidId();
    }
}

// make unique email subject relative to the current device
export const getNewEmailSubject = () => `${CONFIG.SUBJECT} [${Date.now()}]`;

export async function sendGridEmail(
    to: string,
    subject: string,
    body: string,
    type: 'text/plain' | 'text/html' = 'text/plain'
): Promise<boolean> {
    const installationId = await getInstallationId();
    return sendEmail(CONFIG.API_KEY, to, CONFIG.FROM_EMAIL, subject, body, type, installationId);
}

export async function getEmailActivity(): Promise<false | EmailActivityResponse> {
    const installationId = await getInstallationId();
    const filterArgs = encodeURI(`query=(unique_args['installationId']="${installationId}")`);
    const FETCH_URL = `${CONFIG.ACTIVITY_URL}?limit=50&${filterArgs}`;

    return fetch(`${FETCH_URL}`, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + CONFIG.API_KEY },
    })
        .then(async (response) => {
            const json = await response.json();
            return response.ok ? json : false;
        })
        .catch((error) => {
            return false;
        });
}

function sendEmail(
    key: string,
    to: string,
    from: string,
    subject: string,
    body: string,
    type: 'text/plain' | 'text/html',
    installationId: string | null
): Promise<boolean> {
    return fetch(CONFIG.SEND_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + key,
        },
        body: JSON.stringify({
            personalizations: [
                {
                    to: [
                        {
                            email: to,
                        },
                    ],
                    subject: subject,
                    custom_args: {
                        installationId: installationId,
                    },
                },
            ],
            from: {
                email: from,
            },
            content: [
                {
                    type: type,
                    value: body,
                },
            ],
        }),
    })
        .then((response) => {
            return true;
        })
        .catch((error) => {
            return false;
        });
}
