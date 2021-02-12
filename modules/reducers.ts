//  App Reducers
import { Action, AppState } from '../types';

export const initialState: AppState = {
    emails: [],
    emailActivityLoading: false,
    error: '',
    loading: false,
    scans: [],
};

export default function appReducers(state: AppState = initialState, action: Action) {
    switch (action.type) {
        case 'RESET_STORE':
            return { ...initialState };
        case 'SET_ERROR': {
            return { ...state, error: action.error };
        }
        case 'SET_LOADING': {
            return { ...state, loading: action.loading };
        }
        case 'SET_EMAIL_ACTIVITY_LOADING': {
            return { ...state, emailActivityLoading: action.loading };
        }
        case 'ADD_SCAN': {
            return { ...state, scans: [action.scan, ...state.scans] };
        }
        case 'REMOVE_SCANS': {
            const currentScans = state.scans;
            action.scanIds.forEach((id) => {
                const index = currentScans.findIndex((item) => item.id === id);
                if (index > -1) {
                    currentScans.splice(index, 1);
                }
            });

            return { ...state, scans: [...currentScans] };
        }
        case 'UPDATE_EMAIL_ACTIVITY': {
            const latestEmails = action.emails;
            // collect placeholder emails pending SendGrid response
            const placeholderEmails = state.emails.filter(
                (origEmail) =>
                    origEmail.msg_id === '' &&
                    latestEmails.findIndex((newEmail) => newEmail.subject === origEmail.subject) < 0
            );
            // collect older emails with no recent updates from SendGrid
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
            return { ...state, emailActivityLoading: false, emails: allEmails };
        }
        default:
            return state;
    }
}
