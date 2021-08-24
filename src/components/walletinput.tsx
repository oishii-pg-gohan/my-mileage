import { useState } from "react";
import { AppContextType, useAppContext } from "state/context";
import { existsAccount } from "web3/web3js";

/**
 * Wallet Address入力Component
 * 
 */
export function WalletInput(): JSX.Element {
    const context: AppContextType = useAppContext();
    const [address, setAddress] = useState(context.state.myWalletAddress);

    const updateMyWalletAddress = (address: string) => {
        context.dispatch({
            type: 'update_my_wallet_address',
            data: {
                myWalletAddress: address
            }
        });
    }

    return (
        <div className="flex text-center">
            <div className="flex">
                <div className="text-lg leading-4 p-1">
                    Wallet<br />Address
                </div>
            </div>
            <div className="flex-grow px-2">
                <input type="text" className="w-full leading-4 rounded" value={address} onInput={(e) => {
                    const target: HTMLInputElement = e.target as HTMLInputElement;
                    setAddress(target.value);
                }}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            updateMyWalletAddress(address);
                            existsAccount(address);
                        }
                    }}
                />
            </div>
            <div className="flex">
                <button className="px-2" onClick={() => {
                    updateMyWalletAddress(address);
                    existsAccount(address);
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>                </button>
                <div className="flex-grow-0"></div>
            </div>
        </div>
    );
}