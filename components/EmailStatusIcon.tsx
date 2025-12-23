import React from 'react';
import { Icon } from '@rneui/themed';

import Colors from '../constants/Colors';

const EmailStatusIcon = React.memo(({ status }: { status: string }) => {
    let iconColor = Colors.light.primary;
    let iconName = 'email-sync';
    let iconSize = 26;
    switch (status) {
        case 'bounced':
        case 'not_delivered':
            iconName = 'email-alert-outline';
            iconSize = 28;
            iconColor = Colors.light.warningBg;
            break;
        case 'delivered':
            iconName = 'email-check-outline';
            break;

        default:
            break;
    }

    return <Icon color={iconColor} name={iconName} size={iconSize} type="material-community" />;
});

export default EmailStatusIcon;
