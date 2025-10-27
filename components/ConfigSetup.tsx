
import React from 'react';
import { AppState } from '../types.ts';

interface ConfigSetupProps {
  appState: AppState;
  onUpdate: (newState: Partial<AppState>) => void;
}

const ConfigSetup: React.FC<ConfigSetupProps> = ({ appState, onUpdate }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: parseInt(value, 10) || 0 });
  };
  
  return (
    <div className="bg-grantkeepr-gray p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 border-b border-grantkeepr-light-gray pb-2">1. Configuration Setup</h2>
      <p className="text-gray-400 mb-4">
        After creating the KEEPR ASA and deploying the smart contract on Algorand Testnet, please enter their IDs below.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="assetId" className="block text-sm font-medium text-gray-300 mb-1">
            KEEPR Asset ID
          </label>
          <input
            type="number"
            id="assetId"
            name="assetId"
            value={appState.assetId || ''}
            onChange={handleInputChange}
            className="w-full bg-grantkeepr-dark border border-grantkeepr-light-gray text-white rounded-md p-2 focus:ring-2 focus:ring-algorand-blue focus:outline-none font-mono"
            placeholder="Enter KEEPR ASA ID"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="appId" className="block text-sm font-medium text-gray-300 mb-1">
            TCR Contract App ID
          </label>
          <input
            type="number"
            id="appId"
            name="appId"
            value={appState.appId || ''}
            onChange={handleInputChange}
            className="w-full bg-grantkeepr-dark border border-grantkeepr-light-gray text-white rounded-md p-2 focus:ring-2 focus:ring-algorand-blue focus:outline-none font-mono"
            placeholder="Enter Smart Contract App ID"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfigSetup;