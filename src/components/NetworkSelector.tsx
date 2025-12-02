import { useAppKitState, useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'

export function NetworkSelector() {
  const { open } = useAppKit()
  const { selectedNetworkId } = useAppKitState()
  const { isConnected } = useAccount()

  if (!isConnected) return null

  const getNetworkName = (networkId: number) => {
    switch (networkId) {
      case 1:
        return 'Ethereum'
      case 11155111:
        return 'Sepolia'
      case 137:
        return 'Polygon'
      default:
        return `Network ${networkId}`
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm font-medium text-gray-700">
          {selectedNetworkId ? getNetworkName(selectedNetworkId) : 'Unknown Network'}
        </span>
      </div>
      <button
        onClick={() => open({ view: 'Networks' })}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Switch Network
      </button>
    </div>
  )
}