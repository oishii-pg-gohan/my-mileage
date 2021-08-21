import { Comment } from "modules/update_comments";
import { useEffect, useRef } from "react";
import { AppContextType, useAppContext } from "state/context";
import { HistoryUnit } from "./history_unit";

/**
 * コメントの履歴Component
 * 
 */
export function History(): JSX.Element {
    const context: AppContextType = useAppContext();
    const ref = useRef<HTMLDivElement>(null);
    useEffect((): void => {
        console.log('called??');
        ref!.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    });

    return (
        <div className="flex-col text-center m-4 px-2 ">
            {
                (context.state.validAccount)
                    ? <>
                        {context.state.comments.map((comment: Comment, idx: number) => HistoryUnit(comment, idx, context.state.myWalletAddress))}
                        <div ref={ref} />
                    </>
                    : null
            }
        </div>

    );
}

