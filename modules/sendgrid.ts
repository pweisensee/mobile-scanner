import Constants from 'expo-constants';
import { SENDGRID_API_KEY } from '@env';
import { EmailActivityResponse } from '../types';

const CONFIG = {
    ACTIVITY_URL: 'https://api.sendgrid.com/v3/messages',
    API_KEY: SENDGRID_API_KEY,
    CUSTOM_ARG: Constants.installationId,
    FROM_EMAIL: 'team+sendgrid@synergetx.io',
    SEND_URL: 'https://api.sendgrid.com/v3/mail/send',
};

export function sendGridEmail(
    to: string,
    subject: string,
    body: string,
    type: 'text/plain' | 'text/html' = 'text/plain'
): Promise<boolean> {
    return sendEmail(CONFIG.API_KEY, to, CONFIG.FROM_EMAIL, subject, body, type);
}

export function getEmailActivity(): Promise<false | EmailActivityResponse> {
    const filterArgs = encodeURI(`query=(unique_args['installationId']="${CONFIG.CUSTOM_ARG}")`);
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
    type: 'text/plain' | 'text/html'
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
                        installationId: CONFIG.CUSTOM_ARG,
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
