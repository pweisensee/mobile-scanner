import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './navigation';
import { ScanStoreProvider, useScanStore } from './modules/ScanStore';

void SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 300, fade: true });

function HydratedApp() {
    const { hydrated } = useScanStore();
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
            <View style={styles.container} onLayout={onLayoutRootView}>
                <Navigation />
                <StatusBar style="dark" />
                <Toast position={'bottom'} />
            </View>
        </ErrorBoundary>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <ScanStoreProvider>
                <HydratedApp />
            </ScanStoreProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});
