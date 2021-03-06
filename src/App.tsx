import { History } from 'components/history/history';
import { Register } from 'components/register';
import { WalletInput } from 'components/walletinput';
import { useEffect } from 'react';
import { AppContextType, useAppContext } from 'state/context';
import { fetchComments, init, setContextGetter } from 'web3/web3js';

let context: AppContextType;

export function App() {
  context = useAppContext();

  const getContext = () => {
    return context;
  }

  useEffect(() => {
    setContextGetter(getContext)
    init();
    fetchComments();
  }, []);

  return (
    <div className="m-0 p-4 bg-blue-50 h-screen max-h-screen min-h-screen overflow-y-hidden">
      <div className="flex flex-col max-h-screen min-h-screen">
        <div className="flex-grow-0 text-center">
          <WalletInput />
        </div>
        <div className="flex-grow min-h-full overflow-auto">
          <History />
        </div>
        <div className="flex-grow-0 mt-0">
          <Register />
        </div>
      </div>
    </div>
  );
}

