import { reducerUpdateComments } from "modules/update_comments";
import { reducerUpdateValidAccount } from "modules/update_valid_account";
import { reducerUpdateMyWalletAddress } from "modules/update_my_wallet_address";
import { ActionType } from "./action_types";
import { AppState } from "./app_state";

export const reducer: React.Reducer<AppState, ActionType> = (state: AppState, action: ActionType) => {
    switch (action.type) {
        case 'update_my_wallet_address':
            return reducerUpdateMyWalletAddress(state, action);
        case 'update_valid_account':
            return reducerUpdateValidAccount(state, action);
        case 'update_comments':
            return reducerUpdateComments(state, action);
        default:
            throw new Error();
    }
}

