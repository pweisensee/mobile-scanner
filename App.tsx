import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';

import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './navigation';
import { persistor, store } from './modules/store';
import Theme from './constants/Theme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function HydratedApp({ hydrated }: { hydrated: boolean }) {
    const onLayoutRootView = useCallback(async () => {
        if (hydrated) {
            await SplashScreen.hideAsync();
        }
    }, [hydrated]);

    if (!hydrated) {
        return null;
    }

    return (
        <ErrorBoundary location={`App Level`}>
            <GestureHandlerRootView style={styles.container} onLayout={onLayoutRootView}>
                <Navigation />
                <StatusBar />
                <Toast position={'bottom'} />
            </GestureHandlerRootView>
        </ErrorBoundary>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <ThemeProvider theme={Theme}>
                    <PersistGate loading={null} persistor={persistor}>
                        {/* @ts-expect-error */}
                        {(hydrated: boolean) => <HydratedApp hydrated={hydrated} />}
                    </PersistGate>
                </ThemeProvider>
            </Provider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});
