import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { updateEmailActivity } from '../modules/appSlice';
import { AppState, EmailStackParamList } from '../types';
import EmailListItem from '../components/EmailListItem';
import Colors from '../constants/Colors';
import EmailListPlaceholder from '../components/EmailListPlaceholder';

interface Props extends StackScreenProps<EmailStackParamList, 'EmailHistory'> {}

export default function EmailHistoryScreen(props: Props) {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
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
                    <EmailListPlaceholder />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
