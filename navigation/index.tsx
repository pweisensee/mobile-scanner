import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ScanHistoryScreen from '../screens/ScanHistory';
import ScanScreen from '../screens/Scan';
import EmailScreen from '../screens/Email';

// export default Root Navigator
export default function Navigation() {
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    useEffect(
        () =>
            Toast.show({
                type: 'info',
                position: 'top',
                text1: 'Ready to scan',
                text2: 'Use the scan button below to get started',
                visibilityTime: 4000,
            }),
        []
    );

    return (
        <Stack.Navigator
            initialRouteName="ScanHistory"
            screenOptions={{
                contentStyle: { backgroundColor: '#f8fafc' },
                headerShadowVisible: false,
                headerTintColor: '#0f172a',
            }}
        >
            <Stack.Screen
                name="ScanHistory"
                component={ScanHistoryScreen}
                options={{ title: 'Scans' }}
            />
            <Stack.Screen name="Scan" component={ScanScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="SendEmail"
                component={EmailScreen}
                options={{ title: 'Share scans' }}
            />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}
