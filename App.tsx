import React, { useState, useCallback, useMemo } from 'react';
import * as UseWallet from '@txnlab/use-wallet-react';

import { AppState, Notification } from './types.ts';
import Header from './components/Header.tsx';
import ConfigSetup from './components/ConfigSetup.tsx';
import CuratorPanel from './components/CuratorPanel.tsx';
import BountyBoard from './components/BountyBoard.tsx';
import NotificationToast from './components/NotificationToast.tsx';
import HelpModal from './components/HelpModal.tsx';

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    appId: 0,
    assetId: 0,
  });
  const [notification, setNotification] = useState<Notification | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const network = 'testnet';
  const algodConfig = {
    baseServer: 'https://testnet-api.algonode.cloud',
    port: 443, // Use number for port
    token: '',
  };

  const walletManager = useMemo(() => new UseWallet.WalletManager({
    wallets: [UseWallet.WalletId.PERA],
    defaultNetwork: network,
    networks: {
      [network]: {
        algod: algodConfig,
      },
    },
  }), []);

  const showNotification = useCallback((message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  }, []);
  
  const handleStateUpdate = (newState: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...newState }));
  };

  const triggerRefresh = useCallback(() => {
    setRefreshCounter(prev => prev + 1);
  }, []);

  return (
    <UseWallet.WalletProvider manager={walletManager}>
      <div className="min-h-screen bg-grantkeepr-dark text-gray-100 font-sans">
        <Header onHelpClick={() => setIsHelpModalOpen(true)} />
        <main className="container mx-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">GrantKeepr Protocol POC</h1>
              <p className="text-gray-400">
                A minimal viable demonstration of the core crypto-economic loop on Algorand Testnet.
              </p>
            </div>
            
            <ConfigSetup appState={appState} onUpdate={handleStateUpdate} />

            <div className="grid md:grid-cols-2 gap-8">
              <CuratorPanel appState={appState} showNotification={showNotification} onStakeSuccess={triggerRefresh} />
              <BountyBoard appId={appState.appId} refreshCounter={refreshCounter} />
            </div>
          </div>
        </main>
        {notification && (
          <NotificationToast
            message={notification.message}
            type={notification.type}
            onDismiss={() => setNotification(null)}
          />
        )}
        <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
      </div>
    </UseWallet.WalletProvider>
  );
}