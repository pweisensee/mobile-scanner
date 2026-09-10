// NAVIGATION
export type RootStackParamList = {
    ScanHistory: { selectedScanIds?: number[] } | undefined;
    Scan: undefined;
    SendEmail: { selectedScanIds: number[] };
    NotFound: undefined;
};

// APPLICATION DATA

export type ScanRecord = { data: string; id: number; isLink: boolean; type: string };
