import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EmailHistoryScreen from '../screens/EmailHistory';
import { EmailStackParamList } from '../types';

const EmailStack = createStackNavigator<EmailStackParamList>();

export default function EmailNavigator() {
    return (
        <EmailStack.Navigator>
            <EmailStack.Screen
                name="EmailHistory"
                component={EmailHistoryScreen}
                options={{ headerTitle: 'Email History' }}
            />
        </EmailStack.Navigator>
    );
}
