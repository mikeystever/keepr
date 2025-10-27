import algosdk from 'algosdk';
import { BountyBoardState } from '../types.ts';
import { Buffer } from 'buffer';
import { AlgorandClient } from '@algorandfoundation/algokit-utils';

const algodConfig = {
  server: 'https://testnet-api.algonode.cloud',
  port: '443',
  token: '',
};

// Use AlgoKit utils to create a robust Algorand client instance
export const algorand = AlgorandClient.fromConfig({ algodConfig });

// Export the underlying algod client for components that need direct access
export const ALGOD_CLIENT = algorand.client.algod;


// Helper to parse global state
const parseGlobalState = (state: any[]): Map<string, number> => {
  const parsedState = new Map<string, number>();
  if (!state) return parsedState;

  state.forEach(item => {
    const key = Buffer.from(item.key, 'base64').toString('utf-8');
    const value = item.value.uint;
    parsedState.set(key, value);
  });
  return parsedState;
};

export async function readBountyBoardState(appId: number): Promise<BountyBoardState> {
  if (appId === 0) {
    return { totalCurators: 0, verifiedBountyId: 0, stakeRequirement: 10 };
  }

  try {
    const appInfo = await ALGOD_CLIENT.getApplicationByID(appId).do();
    const globalState = parseGlobalState(appInfo.params['global-state']);

    return {
      totalCurators: globalState.get('total_curators_staked') || 0,
      verifiedBountyId: globalState.get('current_verified_bounty') || 0,
      stakeRequirement: globalState.get('stake_amount') || 10, // Default to 10 if not in state
    };
  } catch (error) {
    console.error(`Failed to read state for App ID ${appId}:`, error);
    throw new Error('Could not fetch data from the smart contract. Please check the App ID.');
  }
}