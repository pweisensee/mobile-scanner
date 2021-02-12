import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import ago from 's-ago';

import Colors from '../constants/Colors';
import EmailStatusIcon from './EmailStatusIcon';
import { EmailActivityRecord } from '../types';

type Props = {
    email: EmailActivityRecord;
};

export default function EmailListItem(props: Props) {
    const { subject, to_email, status, opens_count, clicks_count, last_event_time } = props.email;
    const lastActivity = last_event_time ? ago(new Date(last_event_time)) : false;

    return (
        <ListItem bottomDivider>
            <EmailStatusIcon status={status} />
            <ListItem.Content>
                <ListItem.Title style={{ color: Colors.light.text }}>{subject}</ListItem.Title>
                <ListItem.Subtitle>{`To: ${to_email}`}</ListItem.Subtitle>
                <View style={styles.row}>
                    <View style={[styles.column, { flex: 2 }]}>
                        <ListItem.Subtitle>{`Status: ${status}`}</ListItem.Subtitle>
                        {lastActivity ? (
                            <ListItem.Subtitle>{`Activity: ${lastActivity}`}</ListItem.Subtitle>
                        ) : null}
                    </View>
                    <View style={styles.column}>
                        <ListItem.Subtitle>{`# Opened: ${opens_count}`}</ListItem.Subtitle>
                        <ListItem.Subtitle>{`# Clicks: ${clicks_count}`}</ListItem.Subtitle>
                    </View>
                </View>
            </ListItem.Content>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    column: { flex: 1, flexDirection: 'column' },
    row: { flex: 1, flexDirection: 'row' },
});
