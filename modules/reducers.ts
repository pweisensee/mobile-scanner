//  App Reducers
import { Action, AppState } from '../types';

export const initialState: AppState = {
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
        default:
            return state;
    }
}
