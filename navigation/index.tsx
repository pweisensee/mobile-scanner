import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// export default Root Navigator
export default function Navigation() {
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    useEffect(
        () =>
            Toast.show({
                type: 'info',
                position: 'top',
                text1: `Welcome to our Mobile Scanning app!`,
                text2: 'Use the blue scan button below to get started',
                visibilityTime: 4000,
            }),
        []
    );

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}
