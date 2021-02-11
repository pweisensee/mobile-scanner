import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';

import { updateEmailActivity } from '../modules/actions';
import { AppState, EmailStackParamList } from '../types';
import EmailListItem from '../components/EmailListItem';
import Colors from '../constants/Colors';

interface Props extends StackScreenProps<EmailStackParamList, 'EmailHistory'> {}

export default function EmailHistoryScreen(props: Props) {
    const dispatch = useDispatch();
    // current emails in Redux
    const selectEmails = (state: AppState) => state.emails;
    const currentEmails = useSelector(selectEmails);
    // current email activity loading status in Redux
    const selectRefreshingStatus = (state: AppState) => state.emailActivityLoading;
    const refreshing = useSelector(selectRefreshingStatus);
    // on pull to refresh
    const onRefresh = () => dispatch(updateEmailActivity());

    // check for past emails on tab mount
    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        colors={[Colors.light.primary]}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        tintColor={Colors.light.primary}
                    />
                }
            >
                {currentEmails?.length ? (
                    currentEmails.map((item, index) => <EmailListItem key={index} email={item} />)
                ) : (
                    <View style={styles.centerView}>
                        <Icon name="arrow-long-down" size={50} type="entypo" />
                        <View style={{ alignItems: 'center', marginVertical: 50 }}>
                            <Text style={styles.title}>No emails yet.</Text>
                            <Text>Pull to refresh list</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
