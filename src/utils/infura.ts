const MAINET_RPC_URL = 'https://mainnet.infura.io/metamask'
const ROPSTEN_RPC_URL = 'https://ropsten.infura.io/metamask'
const KOVAN_RPC_URL = 'https://kovan.infura.io/metamask'
const RINKEBY_RPC_URL = 'https://rinkeby.infura.io/metamask'

global.METAMASK_DEBUG = 'GULP_METAMASK_DEBUG'

export const network = {
  mainnet: MAINET_RPC_URL,
  ropsten: ROPSTEN_RPC_URL,
  kovan: KOVAN_RPC_URL,
  rinkeby: RINKEBY_RPC_URL
}
