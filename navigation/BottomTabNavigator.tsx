import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import { BottomTabsParamList } from '../types';
import ScanNavigator from './ScanNavigator';
import EmailNavigator from './EmailNavigator';

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

export default function MainNavigator() {
    return (
        <BottomTabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'magnify-scan';

                    if (route.name === 'Scan') {
                        iconName = 'magnify-scan';
                    } else if (route.name === 'Email') {
                        iconName = 'email-search';
                    }

                    // You can return any component that you like here!
                    return (
                        <Icon name={iconName} type="material-community" size={size} color={color} />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: '#1c5ce9',
                inactiveTintColor: 'gray',
            }}
        >
            <BottomTabs.Screen name="Scan" component={ScanNavigator} />
            <BottomTabs.Screen name="Email" component={EmailNavigator} />
        </BottomTabs.Navigator>
    );
}
