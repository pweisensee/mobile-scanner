import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, ScanRecord, EmailActivityRecord } from '../types';
import { getEmailActivity, getNewEmailSubject, sendGridEmail } from './sendgrid';
import Toast from 'react-native-toast-message';

const initialState: AppState = {
    emails: [],
    emailActivityLoading: false,
    error: '',
    loading: false,
    scans: [],
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        resetStore: (state) => {
            return { ...initialState };
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setEmailLoading: (state, action: PayloadAction<boolean>) => {
            state.emailActivityLoading = action.payload;
        },
        addScan: (state, action: PayloadAction<ScanRecord>) => {
            state.scans.unshift(action.payload);
        },
        removeScans: (state, action: PayloadAction<number[]>) => {
            const scanIds = action.payload;
            state.scans = state.scans.filter((scan) => !scanIds.includes(scan.id));
            Toast.show({
                type: 'success',
                text1: `${scanIds.length} items deleted`,
            });
        },
        updateEmailList: (state, action: PayloadAction<EmailActivityRecord[]>) => {
            const latestEmails = action.payload;
            const placeholderEmails = state.emails.filter(
                (origEmail) =>
                    origEmail.msg_id === '' &&
                    latestEmails.findIndex((newEmail) => newEmail.subject === origEmail.subject) < 0
            );
            const exisitingEmails = state.emails.filter(
                (origEmail) =>
                    origEmail.msg_id.length &&
                    latestEmails.findIndex((newEmail) => newEmail.msg_id === origEmail.msg_id) < 0
            );

            const allEmails = latestEmails
                .concat(placeholderEmails)
                .concat(exisitingEmails)
                .sort(
                    (a, b) =>
                        new Date(b.last_event_time).valueOf() -
                        new Date(a.last_event_time).valueOf()
                );
            state.emailActivityLoading = false;
            state.emails = allEmails;
        },
    },
});

export const {
    resetStore,
    setError,
    setLoading,
    setEmailLoading,
    addScan,
    removeScans,
    updateEmailList,
} = appSlice.actions;

// Async Thunks
export const sendEmail = (toAddress: string, body: string) => async (dispatch: any) => {
    try {
        const subject = getNewEmailSubject();
        const result = await sendGridEmail(toAddress, subject, body);
        if (result) {
            const newEmailPlaceholder: EmailActivityRecord = {
                from_email: '',
                msg_id: '',
                subject,
                to_email: toAddress,
                status: 'pending',
                opens_count: 0,
                clicks_count: 0,
                last_event_time: new Date().toLocaleString(),
            };
            dispatch(updateEmailList([newEmailPlaceholder]));
        }
        return result;
    } catch (error) {
        return false;
    }
};

export const updateEmailActivity = () => async (dispatch: any) => {
    dispatch(setEmailLoading(true));
    try {
        const recentActivity = await getEmailActivity();
        if (recentActivity && recentActivity.messages.length) {
            dispatch(updateEmailList(recentActivity.messages));
        } else {
            dispatch(setEmailLoading(false));
        }
    } catch (error) {
        dispatch(setEmailLoading(false));
    }
};

export default appSlice.reducer;
