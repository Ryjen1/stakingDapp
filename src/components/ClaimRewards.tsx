import { useState } from 'react';
import { useWriteContract, useAccount, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { stakingContractAddress, stakingContractABI } from '../lib/contracts';
import { ethers } from 'ethers';
import { useNotification } from './NotificationProvider';
import { Tooltip, InfoCard } from './ui';

export function ClaimRewards() {
  const { address } = useAccount();
  const { showSuccess, showError } = useNotification();

  // Check user's pending rewards
  const { data: pendingRewards } = useReadContract({
    address: stakingContractAddress,
    abi: stakingContractABI,
    functionName: 'getPendingRewards',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  }) as { data: bigint | undefined };

  const { writeContractAsync: claim, data: claimTxHash } = useWriteContract();

  const { isLoading: isClaimLoading } = useWaitForTransactionReceipt({
    hash: claimTxHash,
  });

  const handleClaim = async () => {
    if (!address) return;

    // Check if user has rewards to claim
    const rewardsAmount = pendingRewards || BigInt(0);
    if (rewardsAmount === BigInt(0)) {
      showError('No Rewards Available', 'You have no rewards available to claim at this time.');
      return;
    }

    try {
      await claim({
        address: stakingContractAddress,
        abi: stakingContractABI,
        functionName: 'claimRewards',
      });

      showSuccess('Rewards Claimed!', `Successfully claimed ${ethers.formatEther(rewardsAmount)} HAPG tokens!`);
    } catch (error: unknown) {
      console.error('Claim failed:', error);
      showError('Claim Failed', error instanceof Error ? error.message : 'Claim failed. Please try again.');
    }
  };

  const rewardsAmount = pendingRewards || BigInt(0);

  return (
    <div className="space-y-4">
      {/* Rewards Information */}
      <InfoCard
        title="Understanding Reward Claims"
        description={
          <div className="space-y-2">
            <p>Claim your earned HAPG token rewards from staking in the protocol.</p>
            <div className="text-xs space-y-1">
              <p>• <strong>Earning:</strong> Rewards accrue continuously while staked</p>
              <p>• <strong>Timing:</strong> No time limit to claim your rewards</p>
              <p>• <strong>Gas Fees:</strong> Claiming rewards requires a small gas fee</p>
              <p>• <strong>Frequency:</strong> Can be claimed as often as you want</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-2">
              <p className="text-xs text-green-700 font-medium">💡 Tip: Regular claiming doesn't affect your staked principal - only the rewards are distributed.</p>
            </div>
          </div>
        }
        variant="success"
        helpContent="Rewards are automatically calculated based on your staked amount and the protocol's reward rate."
        collapsible={true}
        defaultExpanded={false}
      />

      {/* Pending Rewards Display */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <p className="text-sm text-yellow-800">
          <span className="font-medium">Pending Rewards:</span> {ethers.formatEther(rewardsAmount)} tokens
        </p>
      </div>

      <Tooltip content="Harvest your earned rewards">
        <button
          onClick={handleClaim}
          disabled={!address || isClaimLoading || rewardsAmount === BigInt(0)}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed btn-crystal-primary btn-glow-yellow btn-ripple shadow-crystal"
        >
          {isClaimLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Claiming...
            </div>
          ) : rewardsAmount === BigInt(0) ? (
            'No Rewards Available'
          ) : (
            'Claim Rewards'
          )}
        </button>
      </Tooltip>
    </div>
  );
}
