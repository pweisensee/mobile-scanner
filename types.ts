// NAVIGATION
export type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
};

export type BottomTabsParamList = {
    Email: undefined;
    Scan: undefined;
};

export type EmailStackParamList = {
    EmailHistory: undefined;
};

export type ScanStackParamList = {
    Email: { selectedScanIds?: number[] };
    Scan: undefined;
    ScanHistory: { selectedScanIds?: number[]; selectMode?: boolean };
};

// REDUX
export type Action =
    | { type: 'RESET_STORE' }
    | { type: 'SET_ERROR'; error: string }
    | { type: 'SET_LOADING'; loading: boolean }
    | { type: 'ADD_SCAN'; scan: ScanRecord }
    | { type: 'SET_EMAIL_ACTIVITY_LOADING'; loading: boolean }
    | { type: 'UPDATE_EMAIL_ACTIVITY'; emails: EmailActivityRecord[] }
    | { type: 'REMOVE_SCANS'; scanIds: number[] };

export interface AppState {
    emails: EmailActivityRecord[];
    emailActivityLoading: boolean;
    error: string;
    loading: boolean;
    scans: ScansHistory;
}

export type GetState = () => AppState;

// APPLICATION DATA

export type EmailActivityRecord = {
    from_email: string;
    msg_id: string;
    subject: string;
    to_email: string;
    status: string;
    opens_count: number;
    clicks_count: number;
    last_event_time: string;
};

export type EmailActivityResponse = { messages: EmailActivityRecord[] };

export type ScanRecord = { data: string; id: number; isLink: boolean; type: string };

type ScansHistory = ScanRecord[];
