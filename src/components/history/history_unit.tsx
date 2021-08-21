import { Comment } from "modules/update_comments";
import { randamId } from "utils/idutils";
import { LoveIcon } from "./like_icon";
import { Msg } from "./msg";

/**
 * 1つ1つのコメントを表すComponent
 * 
 * @param comment コメント（メッセージ）
 * @param idx コメントのインデックス
 * @param myWalletAddress ユーザーのWallet Address
 * @returns 
 */
export function HistoryUnit(comment: Comment, idx: number, myWalletAddress: string): JSX.Element {
    return (
        <div className={"flex" + (comment.owner === myWalletAddress ? " flex-row-reverse" : " flex-row")} key={randamId()}>
            <div className={"max-w-3/4 my-4"}>
                {Msg(comment.msg)}
                {LoveIcon(comment, idx, myWalletAddress)}
            </div>
            <div className="flex-grow"></div>
        </div>
    );
}

