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
    | { type: 'REMOVE_SCANS'; scanIds: number[] };

export interface AppState {
    error: string;
    loading: boolean;
    scans: ScansHistory;
}

export type ScanRecord = { data: string; id: number; isLink: boolean; type: string };

type ScansHistory = ScanRecord[];
