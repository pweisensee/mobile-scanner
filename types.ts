import { NavigatorScreenParams } from '@react-navigation/native';

// NAVIGATION
export type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
};

export type BottomTabsParamList = {
    Email: NavigatorScreenParams<EmailStackParamList>;
    Scan: NavigatorScreenParams<ScanStackParamList>;
    ScanHistory: { selectedScanIds?: number[]; selectMode?: boolean };
};

export type EmailStackParamList = {
    EmailHistory: undefined;
};

export type ScanStackParamList = {
    SendEmail: { selectedScanIds?: number[] };
    Scan: undefined;
    ScanHistory: { selectedScanIds?: number[]; selectMode?: boolean };
};

// REDUX

export interface AppState {
    emails: EmailActivityRecord[];
    emailActivityLoading: boolean;
    error: string;
    loading: boolean;
    scans: ScansHistory;
}

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
