import { useReadContract } from 'wagmi';
import { stakingContractAddress, stakingContractABI } from '../lib/contracts';
import { ethers } from 'ethers';
import { HelpIcon, InfoCard } from './ui';

export function ProtocolStats() {
  const { data: totalStaked } = useReadContract({
    address: stakingContractAddress,
    abi: stakingContractABI,
    functionName: 'totalStaked',
  });

  const { data: currentRewardRate } = useReadContract({
    address: stakingContractAddress,
    abi: stakingContractABI,
    functionName: 'currentRewardRate',
  });

  const { data: totalRewards } = useReadContract({
    address: stakingContractAddress,
    abi: stakingContractABI,
    functionName: 'getTotalRewards',
  });

  return (
    <div className="space-y-4">
      {/* Protocol Overview */}
      <InfoCard
        title="Protocol Statistics Overview"
        description={
          <div className="space-y-2">
            <p>These metrics show the overall health and performance of the Crystal Stakes protocol.</p>
            <div className="text-xs space-y-1">
              <p>• <strong>Total Staked:</strong> Total HAPG tokens locked in the protocol</p>
              <p>• <strong>Current APR:</strong> Annual percentage rate for staking rewards</p>
              <p>• <strong>Total Rewards:</strong> Cumulative rewards distributed to users</p>
            </div>
          </div>
        }
        variant="info"
        helpContent="These statistics are updated in real-time from the blockchain. Higher total staked amounts indicate greater protocol confidence."
        collapsible={true}
        defaultExpanded={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-2xl border border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-indigo-900 flex items-center space-x-2" style={{ fontFamily: 'serif' }}>
                <span>Total HAPG Staked</span>
                <HelpIcon
                  content="Total amount of HAPG tokens currently staked by all users in the protocol. Higher values indicate stronger protocol adoption."
                  position="top"
                  variant="primary"
                  size="sm"
                />
              </h3>
              <p className="text-xs text-indigo-600">Across all users</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-indigo-600 mb-1">
            {totalStaked ? `${parseFloat(ethers.formatEther(totalStaked as bigint)).toFixed(2)}` : '0.00'}
          </p>
          <p className="text-sm text-indigo-500 font-medium">HAPG tokens</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in delay-200">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-emerald-900 flex items-center space-x-2" style={{ fontFamily: 'serif' }}>
                <span>Current APR</span>
                <HelpIcon
                  content="Annual Percentage Rate showing the expected yearly return on staked tokens. This rate may vary based on protocol performance."
                  position="top"
                  variant="primary"
                  size="sm"
                />
              </h3>
              <p className="text-xs text-emerald-600">Annual percentage rate</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-emerald-600 mb-1">
            {currentRewardRate ? `${currentRewardRate}` : '0'}
          </p>
          <p className="text-sm text-emerald-500 font-medium">Percent per year</p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-2xl border border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in delay-400">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-amber-900 flex items-center space-x-2" style={{ fontFamily: 'serif' }}>
                <span>Total Rewards Paid</span>
                <HelpIcon
                  content="Cumulative HAPG tokens distributed as staking rewards to all users since protocol launch."
                  position="top"
                  variant="primary"
                  size="sm"
                />
              </h3>
              <p className="text-xs text-amber-600">HAPG distributed</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-amber-600 mb-1">
            {totalRewards ? `${parseFloat(ethers.formatEther(totalRewards as bigint)).toFixed(2)}` : '0.00'}
          </p>
          <p className="text-sm text-amber-500 font-medium">HAPG tokens</p>
        </div>
      </div>
    </div>
  );
}
