import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Scan: {
                        screens: {
                            Email: 'SendEmail',
                            ScanHistory: 'ScanHistory',
                            Scan: 'Scan',
                        },
                    },
                    Email: {
                        screens: {
                            EmailHistory: 'EmailHistory',
                        },
                    },
                },
            },
            NotFound: '*',
        },
    },
};
