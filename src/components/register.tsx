import { useEffect, useRef, useState } from "react";
import { addComment } from "web3/web3js";

export function Register() {
    const [msg, setMsg] = useState('');
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        ref!.current?.focus();
    });

    const enterComment = () => {
        addComment(msg);
        setMsg('');
        ref.current?.focus();
    }

    return (
        <div className="flex text-center mb-4 px-1 pb-1">
            <div className="flex-grow pr-1">
                <input type="text" className="w-full leading-4 rounded" value={msg} ref={ref} onInput={(e) => {
                    const target: HTMLInputElement = e.target as HTMLInputElement;
                    setMsg(target.value);
                }}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            enterComment();
                        }
                    }}
                />
            </div>
            <div className="flex">
                <button className="px-1" onClick={() => enterComment()} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
                <div className="flex-grow-0"></div>
            </div>
        </div>
    );
}

