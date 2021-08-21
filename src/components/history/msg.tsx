export function Msg(msg: string): JSX.Element {
    return (
        <div className={"max-w-full p-2 break-words text-left text-white bg-blue-800 rounded-lg"}>
            {msg}
        </div>
    );
}

