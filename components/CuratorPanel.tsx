import React, { useState, useEffect } from 'react';
import * as UseWallet from '@txnlab/use-wallet-react';
import { AppState } from '../types';
import { algorand, readBountyBoardState } from '../services/algorand';
import algosdk from 'algosdk';

interface CuratorPanelProps {
  appState: AppState;
  showNotification: (message: string, type: 'success' | 'error') => void;
  onStakeSuccess: () => void;
}

const CuratorPanel: React.FC<CuratorPanelProps> = ({ appState, showNotification, onStakeSuccess }) => {
  const { activeAddress, transactionSigner } = UseWallet.useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(10);
  
  useEffect(() => {
    const fetchStakeAmount = async () => {
      if (appState.appId > 0) {
        try {
          const state = await readBountyBoardState(appState.appId);
          setStakeAmount(state.stakeRequirement);
        } catch (error) {
          console.warn("Could not fetch stake requirement, using default.");
          setStakeAmount(10);
        }
      }
    };
    fetchStakeAmount();
  }, [appState.appId]);

  const handleStake = async () => {
    if (!activeAddress || !transactionSigner) {
      showNotification('Please connect your wallet first.', 'error');
      return;
    }
    if (appState.appId === 0 || appState.assetId === 0) {
      showNotification('Please set the App ID and Asset ID.', 'error');
      return;
    }

    setIsLoading(true);
    algorand.setDefaultSigner(transactionSigner);
    
    try {
      const appAddress = algosdk.getApplicationAddress(appState.appId);
      // Assuming 6 decimals for the ASA from the previous implementation
      const stakeAmountInSmallestUnit = stakeAmount * 1_000_000;

      const result = await algorand.newGroup()
        .addAssetTransfer({
          sender: activeAddress,
          receiver: appAddress,
          assetId: appState.assetId,
          amount: stakeAmountInSmallestUnit,
        })
        .addAppCall({
          sender: activeAddress,
          appId: appState.appId,
          onComplete: 'optin',
          args: ["stake_deposit"]
        })
        .execute();

      showNotification(`Successfully staked ${stakeAmount} KEEPR! TxID: ${result.txIds[0].slice(0,10)}...`, 'success');
      onStakeSuccess();
    } catch (error: any) {
      console.error(error);
      showNotification(error.message || 'Failed to process the stake transaction.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = isLoading || !activeAddress || appState.appId === 0 || appState.assetId === 0;

  return (
    <div className="bg-grantkeepr-gray p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 border-b border-grantkeepr-light-gray pb-2">2. Become a Curator</h2>
      <p className="text-gray-400 mb-6">
        Stake KEEPR tokens to participate in the curation process. This action registers you with the TCR smart contract.
      </p>
      
      <div className="bg-grantkeepr-dark p-4 rounded-md text-center">
        <p className="text-lg">Required Stake:</p>
        <p className="text-3xl font-bold text-algorand-blue">{stakeAmount} KEEPR</p>
      </div>

      <button
        onClick={handleStake}
        disabled={isButtonDisabled}
        className={`w-full mt-6 py-3 px-4 text-lg font-semibold rounded-md transition duration-200 flex items-center justify-center
          ${isButtonDisabled 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700'
          }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : `Stake ${stakeAmount} KEEPR`}
      </button>
      {!activeAddress && <p className="text-center text-yellow-400 mt-4 text-sm">Please connect wallet to stake.</p>}
    </div>
  );
};

export default CuratorPanel;