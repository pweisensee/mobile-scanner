import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Scan: {
                        screens: {
                            SendEmail: 'SendEmail',
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

export default linking;
