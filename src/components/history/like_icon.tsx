import { Comment } from "modules/update_comments";
import { loveComment } from "web3/web3js";

/**
 * いいね！アイコン
 * ※名称にはLikeよりキャッチーなLoveを使用
 * 
 * @param comment コメント
 * @param idx コメントのindex
 * @param myWalletAddress ユーザーのWallet Address
 * @returns 
 */
export function LoveIcon(comment: Comment, idx: number, myWalletAddress: string): JSX.Element {
    return (
        <div className="flex flex-row px-1">
            <div className="flex-grow"></div>
            <div>
                {
                    (comment.lovedUsers.length !== 0)
                        ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" onClick={() => {
                                if (!comment.lovedUsers.includes(myWalletAddress)) {
                                    loveComment(idx);
                                }
                            }}>
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                        )
                        : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => {
                                loveComment(idx);
                            }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        )
                }
            </div>
            <div className="text-pink-400">
                {comment.lovedUsers.length}
            </div>
        </div>
    );
}