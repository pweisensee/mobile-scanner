import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EmailScreen from '../screens/Email';
import ScanHistoryScreen from '../screens/ScanHistory';
import ScanScreen from '../screens/Scan';
import { ScanStackParamList } from '../types';
import Colors from '../constants/Colors';

const ScanStack = createStackNavigator<ScanStackParamList>();

export default function ScanNavigator() {
    return (
        <ScanStack.Navigator>
            <ScanStack.Screen
                name="ScanHistory"
                component={ScanHistoryScreen}
                options={{ headerTitle: 'Scans', headerTitleStyle: { color: Colors.light.text } }}
            />
            <ScanStack.Screen name="Scan" component={ScanScreen} options={{ headerShown: false }} />
            <ScanStack.Screen
                name="SendEmail"
                component={EmailScreen}
                options={{ headerTitle: 'Email', headerTitleStyle: { color: Colors.light.text } }}
            />
        </ScanStack.Navigator>
    );
}
