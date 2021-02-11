// Redux Actions
import Toast from 'react-native-toast-message';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Action, GetState, ScanRecord } from '../types';
import { getEmailActivity } from './sendgrid';

function resetStore(): Action {
    return { type: 'RESET_STORE' };
}

export function setError(error: string): Action {
    return { type: 'SET_ERROR', error };
}

export function setLoading(loading: boolean): Action {
    return { type: 'SET_LOADING', loading };
}

export function addScan(scan: ScanRecord): Action {
    return { type: 'ADD_SCAN', scan };
}

export function setEmailLoading(loading: boolean): Action {
    return { type: 'SET_EMAIL_ACTIVITY_LOADING', loading };
}

export function removeScans(scanIds: number[]): Action {
    Toast.show({
        type: 'success',
        text1: `${scanIds.length} items deleted`,
    });
    return { type: 'REMOVE_SCANS', scanIds };
}

export function updateEmailActivity(): ThunkAction<any, any, any, Action> {
    return async (dispatch: Dispatch<Action>, getState: GetState) => {
        dispatch(setEmailLoading(true));
        const recentActivity = await getEmailActivity().catch((error) => {
            dispatch(setEmailLoading(false));
        });
        if (recentActivity && recentActivity.messages.length) {
            dispatch({ type: 'UPDATE_EMAIL_ACTIVITY', emails: recentActivity.messages });
        } else {
            dispatch(setEmailLoading(false));
        }
    };
}
