import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EmailHistoryScreen from '../screens/EmailHistory';
import { EmailStackParamList } from '../types';
import { DEFAULT_OPTIONS } from './navigationConstants';

const EmailStack = createStackNavigator<EmailStackParamList>();

export default function EmailNavigator() {
    return (
        <EmailStack.Navigator screenOptions={DEFAULT_OPTIONS}>
            <EmailStack.Screen
                name="EmailHistory"
                component={EmailHistoryScreen}
                options={{ headerTitle: 'Email History' }}
            />
        </EmailStack.Navigator>
    );
}
