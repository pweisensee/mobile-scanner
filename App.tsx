import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'react-native-elements';
import Toast from 'react-native-toast-message';

import ErrorBoundary from './components/ErrorBoundary';
import LoadingIndicator from './components/LoadingIndicator';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { persistor, store } from './modules/store';
import Theme from './constants/Theme';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const renderApp = (hydrated: boolean) => {
        if (hydrated) {
            return (
                <ErrorBoundary location={`App Level`}>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                    <Toast ref={(ref) => Toast.setRef(ref)} position={'bottom'} />
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
                    <ThemeProvider theme={Theme}>
                        <PersistGate
                            loading={null}
                            persistor={persistor}
                            children={(hydrated: boolean) => renderApp(hydrated)}
                        />
                    </ThemeProvider>
                </Provider>
            </SafeAreaProvider>
        );
    }
}
