import {
  ProviderMessage,
  ProviderRpcError,
  ProviderConnectInfo,
  RequestArguments
} from 'hardhat/types'
import Web3 from 'web3'
import { Eth } from 'web3-eth'
import { Contract } from 'web3-eth-contract'

// Implementation by Felipe on StackOverflow
// https://stackoverflow.com/questions/65504958/web3-js-extending-the-window-interface-type-definitions

export interface EthereumEvent {
  connect: ProviderConnectInfo
  disconnect: ProviderRpcError
  accountsChanged: Array<string>
  chainChanged: string
  message: ProviderMessage
}

type EventKeys = keyof EthereumEvent
type EventHandler<K extends EventKeys> = (event: EthereumEvent[K]) => void

export interface Ethereumish {
  autoRefreshOnNetworkChange: boolean
  chainId: string
  isMetaMask?: boolean
  isStatus?: boolean
  networkVersion: string
  selectedAddress: any

  on<K extends EventKeys>(event: K, eventHandler: EventHandler<K>): void
  enable(): Promise<any>
  request?: (request: { method: string; params?: Array<any> }) => Promise<any>
  /**
   * @deprecated
   */
  send?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void
  sendAsync: (request: RequestArguments) => Promise<unknown>
}

interface SimpleNFTMehods {
  mint(value: string): void
  colors: [string]
}

declare global {
  interface Window {
    ethereum: Ethereumish
    web3: Web3 & {
      eth: Eth & { Contract: Contract & { methods: SimpleNFTMehods } }
    }
  }
}

export interface Receipt {
  transactionHash: string
  transactionIndex: number
  blockHash: string
  blockNumber: number
  from: string
  to: string
  gasUsed: number
  cumulativeGasUsed: number
  contractAddress: unknown
  status: true
  logsBloom: string
  events: {
    Transfer: {
      logIndex: number
      transactionIndex: number
      transactionHash: string
      blockHash: string
      blockNumber: number
      address: string
      type: 'mined' | string
      id: string
      returnValues: {
        0: string
        1: string
        2: string
        from: string
        to: string
        tokenId: string
      }
      event: 'Transfer' | string
      signature: string
      raw: {
        data: string
        topics: string[]
      }
    }
  }
}
