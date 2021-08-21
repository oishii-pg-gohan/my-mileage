import { AppState } from "state/app_state";

export type ActionValidAccount = {
    type: 'update_valid_account',
    data: {
        validAccount: boolean
    },
};

export function reducerUpdateValidAccount(state: AppState, action: ActionValidAccount): AppState {
    return {
        ...state,
        validAccount: action.data.validAccount
    };
}

