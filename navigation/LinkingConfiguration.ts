import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: {
            SendEmail: 'email',
            ScanHistory: '',
            Scan: 'scan',
            NotFound: '*',
        },
    },
};

export default linking;
