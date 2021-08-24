import { AppState } from "state/app_state";

export interface Comment {
    owner: string,
    msg: string,
    lovedUsers: string[]
}

export type ActionUpdateComments = {
    type: 'update_comments',
    data: {
        comments: Comment[]
    },
};

export function reducerUpdateComments(state: AppState, action: ActionUpdateComments): AppState {
    return {
        ...state,
        comments: action.data.comments
    };
}

