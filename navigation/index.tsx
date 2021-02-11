import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// export default Root Navigator
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}
