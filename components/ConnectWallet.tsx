
import React from 'react';
import * as UseWallet from '@txnlab/use-wallet-react';
import { ALGOD_CLIENT } from '../services/algorand';

const ConnectWallet: React.FC = () => {
  const { providers, activeAddress, activeProvider } = UseWallet.useWallet();

  const connect = (providerId: string) => async () => {
    const provider = providers?.find(p => p.metadata.id === providerId);
    if (!provider) return;
    await provider.connect();
  };

  const disconnect = async () => {
    if (!activeProvider) return;
    await activeProvider.disconnect();
  };

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (activeAddress) {
    return (
      <div className="flex items-center space-x-3">
        <div className="px-3 py-2 bg-grantkeepr-light-gray rounded-md text-sm font-mono">
          {truncateAddress(activeAddress)}
        </div>
        <button
          onClick={disconnect}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      {providers?.map(provider => (
        <button
          key={provider.metadata.id}
          onClick={connect(provider.metadata.id)}
          className="bg-algorand-blue hover:bg-algorand-dark-blue text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center"
        >
          <img src={provider.metadata.icon} alt={provider.metadata.name} className="w-6 h-6 mr-2" />
          Connect Wallet
        </button>
      ))}
    </div>
  );
};

export default ConnectWallet;