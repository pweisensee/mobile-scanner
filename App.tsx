import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'react-native-elements';
import Toast from 'react-native-toast-message';

import ErrorBoundary from './components/ErrorBoundary';
import LoadingIndicator from './components/LoadingIndicator';
import Navigation from './navigation';
import { persistor, store } from './modules/store';
import Theme from './constants/Theme';

export default function App() {
    const renderApp = (hydrated: boolean) => {
        if (hydrated) {
            return (
                <ErrorBoundary location={`App Level`}>
                    <GestureHandlerRootView style={styles.container}>
                        <Navigation />
                        <StatusBar />
                        <Toast position={'bottom'} />
                    </GestureHandlerRootView>
                </ErrorBoundary>
            );
        }
        return (
            <View>
                <LoadingIndicator />
            </View>
        );
    };

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <ThemeProvider theme={Theme} useDark={false}>
                    <PersistGate
                        loading={null}
                        persistor={persistor}
                        // @ts-ignore
                        children={(hydrated: boolean) => renderApp(hydrated)}
                    />
                </ThemeProvider>
            </Provider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});
