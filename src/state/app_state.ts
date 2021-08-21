import { Comment } from "modules/update_comments";

export interface AppState {
    myWalletAddress: string,
    comments: Comment[],
    validAccount: boolean,
}

export const initialState: AppState = {
    myWalletAddress: '',
    comments: [],
    validAccount: false,
}
