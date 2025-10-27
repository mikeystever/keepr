
export interface AppState {
  appId: number;
  assetId: number;
}

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

export interface BountyBoardState {
  totalCurators: number;
  verifiedBountyId: number;
  stakeRequirement: number;
}
