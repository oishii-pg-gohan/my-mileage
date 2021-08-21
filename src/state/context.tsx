import { createContext, useContext, useReducer } from 'react';
import { ActionType } from './action_types';
import { AppState, initialState } from './app_state';
import { reducer } from './reducer';

export type AppContextType = {
    state: AppState,
    dispatch: React.Dispatch<ActionType>
}

export interface AppProviderProps {
    child: JSX.Element
}

export const AppStateContext = createContext({ state: initialState } as AppContextType);

export function useAppContext(): AppContextType {
    return useContext(AppStateContext);
}

export function AppProvider(props: AppProviderProps) {
    const [appState, dispatch] = useReducer(reducer, initialState);

    const value = {
        state: appState,
        dispatch: dispatch
    }
    return (
        <AppStateContext.Provider value={value} >
            {props.child}
        </AppStateContext.Provider>
    );
}
