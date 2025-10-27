import React, { useState, useRef, useEffect } from 'react';
import * as UseWallet from '@txnlab/use-wallet-react';

const ConnectWallet: React.FC = () => {
  const { providers, activeAddress, activeProvider, disconnect } = UseWallet.useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const connect = (providerId: string) => async () => {
    const provider = providers?.find(p => p.metadata.id === providerId);
    if (!provider) return;
    await provider.connect();
    setIsOpen(false);
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

  if (providers == null) {
    return (
      <div className="px-3 py-2 bg-grantkeepr-light-gray rounded-md text-sm">
        Initializing...
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="px-3 py-2 bg-yellow-900 text-yellow-200 rounded-md text-sm">
        No wallet provider found.
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-algorand-blue hover:bg-algorand-dark-blue text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        Connect Wallet
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-grantkeepr-gray rounded-md shadow-lg z-10 border border-grantkeepr-light-gray">
          <ul className="py-1">
            {providers?.map(provider => (
              <li key={provider.metadata.id}>
                <button
                  onClick={connect(provider.metadata.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-grantkeepr-light-gray transition-colors flex items-center gap-3"
                >
                  <img src={provider.metadata.icon} alt={provider.metadata.name} className="w-6 h-6" />
                  <span>Connect {provider.metadata.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;