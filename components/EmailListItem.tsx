import React from 'react';
import { Icon, ListItem } from 'react-native-elements';
import ago from 's-ago';

import { EmailActivityRecord } from '../types';

type Props = {
    email: EmailActivityRecord;
};

export default function EmailListItem(props: Props) {
    const { subject, to_email, status, opens_count, clicks_count, last_event_time } = props.email;
    const lastActivity = last_event_time ? ago(new Date(last_event_time)) : false;

    return (
        <ListItem bottomDivider>
            {StatusIcon(status)}
            <ListItem.Content>
                <ListItem.Title>{subject}</ListItem.Title>
                <ListItem.Subtitle>{`To: ${to_email}`}</ListItem.Subtitle>
                {lastActivity ? (
                    <ListItem.Subtitle>{`Activity: ${lastActivity}`}</ListItem.Subtitle>
                ) : null}
            </ListItem.Content>
            <ListItem.Content>
                <ListItem.Subtitle>{`Status: ${status}`}</ListItem.Subtitle>
                <ListItem.Subtitle>{`# Opened: ${opens_count}`}</ListItem.Subtitle>
                <ListItem.Subtitle>{`# Clicks: ${clicks_count}`}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
}

function StatusIcon(status: string) {
    let iconName = 'email-sync';
    switch (status) {
        case 'bounced':
            iconName = 'email-alert-outline';
            break;
        case 'delivered':
            iconName = 'email-check-outline';
            break;

        default:
            break;
    }

    return <Icon name={iconName} type="material-community" />;
}
