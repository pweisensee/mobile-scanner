import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ErrorBoundary from './components/ErrorBoundary';
import LoadingIndicator from './components/LoadingIndicator';
import { View } from './components/Themed';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { persistor, store } from './modules/store';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const renderApp = (hydrated: boolean) => {
        if (hydrated) {
            return (
                <ErrorBoundary location={`App Level`}>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </ErrorBoundary>
            );
        }
        return (
            <View>
                <LoadingIndicator />
            </View>
        );
    };

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Provider store={store}>
                    <PersistGate
                        loading={null}
                        persistor={persistor}
                        children={(hydrated: boolean) => renderApp(hydrated)}
                    />
                </Provider>
            </SafeAreaProvider>
        );
    }
}
