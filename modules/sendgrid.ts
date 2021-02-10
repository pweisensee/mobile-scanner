import Constants from 'expo-constants';

const CONFIG = {
    ACTIVITY_URL: 'https://api.sendgrid.com/v3/messages',
    API_KEY: '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',
    CUSTOM_ARG: Constants.installationId,
    FROM_EMAIL: 'team+sendgrid@synergetx.io',
    SEND_URL: 'https://api.sendgrid.com/v3/mail/send',
};

export function getEmailActivity(): Promise<false | string[]> {
    return getActivity();
}

export function sendGridEmail(
    to: string,
    subject: string,
    body: string,
    type: 'text/plain' | 'text/html' = 'text/plain'
): Promise<boolean> {
    return sendEmail(CONFIG.API_KEY, to, CONFIG.FROM_EMAIL, subject, body, type);
}

function getActivity(): Promise<false | string[]> {
    return fetch(`${CONFIG.SEND_URL}?unique_args=${CONFIG.CUSTOM_ARG}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + CONFIG.API_KEY,
        },
    })
        .then((response) => {
            return response.ok ? response.json() : false;
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
            custom_args: CONFIG.CUSTOM_ARG,
        }),
    })
        .then((response) => {
            return true;
        })
        .catch((error) => {
            return false;
        });
}
