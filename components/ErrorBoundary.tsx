import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Updates from 'expo-updates';

interface Props {
    children: React.ReactNode;
    location: string;
}

interface State {
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: Error | null, errorInfo: React.ErrorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({ error: error, errorInfo: errorInfo }, () => {
            try {
                console.warn(`App error: ${this.state.error?.message ?? 'Unknown error'}`);
            } catch (caughtError) {
                if (caughtError instanceof Error) {
                    console.warn(`Error boundary logging failed: ${caughtError.message}`);
                }
            }
        });
    }

    hideError = () => this.setState({ error: null, errorInfo: null });

    render() {
        const { error, errorInfo } = this.state;
        if (errorInfo || error) {
            // Error path
            return (
                <View style={styles.containerStyle}>
                    <Text style={styles.titleText}>{`Whoops!`}</Text>
                    <Text
                        style={styles.subtitle}
                    >{`Something went wrong in ${this.props.location}.`}</Text>
                    <Text style={styles.subtitle}>
                        Close this message to try again, or reload the app if the problem continues.
                    </Text>
                    <View style={{ marginVertical: 20, width: '100%' }}>
                        <TouchableOpacity onPress={this.hideError} style={styles.button}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Updates.reloadAsync()}
                            style={[styles.button, styles.red]}
                        >
                            <Text style={styles.buttonText}>Reload app</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        backgroundColor: '#218352',
        padding: 10,
        marginVertical: 10,
        width: '80%',
    },
    buttonText: { fontWeight: 'bold', color: 'white', textAlign: 'center', fontSize: 16 },
    containerStyle: {
        backgroundColor: '#f0e6ef',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: 50,
    },
    subtitle: { fontSize: 16, color: '#1f1f1f', marginBottom: 10, textAlign: 'center' },
    red: { backgroundColor: 'red' },
    titleText: { fontSize: 18, color: '#1f1f1f', marginBottom: 20 },
});
