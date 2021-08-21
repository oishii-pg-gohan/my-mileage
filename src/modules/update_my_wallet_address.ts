import { AppState } from "state/app_state";

export type ActionMyWalletAddress = {
    type: 'update_my_wallet_address',
    data: {
        myWalletAddress: string
    },
};

export function reducerUpdateMyWalletAddress(state: AppState, action: ActionMyWalletAddress): AppState {
    return {
        ...state,
        myWalletAddress: action.data.myWalletAddress
    };
}

