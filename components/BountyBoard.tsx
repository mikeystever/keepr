
import React, { useState, useEffect } from 'react';
import { readBountyBoardState } from '../services/algorand.ts';
import { BountyBoardState } from '../types.ts';

interface BountyBoardProps {
  appId: number;
  refreshCounter: number;
}

const BountyBoard: React.FC<BountyBoardProps> = ({ appId, refreshCounter }) => {
  const [state, setState] = useState<BountyBoardState>({
    totalCurators: 0,
    verifiedBountyId: 0,
    stakeRequirement: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      if (appId === 0) {
        setState({ totalCurators: 0, verifiedBountyId: 0, stakeRequirement: 10 });
        setError('Please enter a valid App ID to fetch on-chain data.');
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await readBountyBoardState(appId);
        setState(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchState();
  }, [appId, refreshCounter]);
  
  const StatCard: React.FC<{ label: string; value: string | number; isLoading: boolean }> = ({ label, value, isLoading }) => (
    <div className="bg-grantkeepr-dark p-4 rounded-md text-center">
      <p className="text-sm text-gray-400 uppercase tracking-wider">{label}</p>
      {isLoading ? (
        <div className="h-9 mt-1 bg-grantkeepr-light-gray rounded animate-pulse w-1/2 mx-auto"></div>
      ) : (
        <p className="text-3xl font-bold text-white">{value}</p>
      )}
    </div>
  );

  return (
    <div className="bg-grantkeepr-gray p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 border-b border-grantkeepr-light-gray pb-2">3. On-Chain Registry (Bounty Board)</h2>
      <p className="text-gray-400 mb-6">
        This data is read directly from the TCR smart contract on the Algorand Testnet.
      </p>

      {error && !isLoading && <div className="bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded-md mb-4 text-sm">{error}</div>}
      
      <div className="space-y-4">
        <StatCard label="Total Curators Staked" value={state.totalCurators} isLoading={isLoading} />
        <StatCard label="Last Verified Bounty ID" value={state.verifiedBountyId} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default BountyBoard;