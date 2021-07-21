import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

import { AbiItem } from 'web3-utils'
import { Contract } from 'web3-eth-contract'
import { Box, Heading, Stack, Text, Flex, Divider } from '@chakra-ui/react'

import { MintForm } from 'components'
import SimpleNFT from '../abis/SimpleNFT.json'
import { MintFormData } from 'components/MintForm'
import { toast } from 'utils/toast'

let web3: Web3
export default function Home() {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [contract, setContract] = useState<Contract>(null)
  const [totalSupply, setTotalSupply] = useState(0)
  const [simpleNFTs, setSimpleNFTs] = useState([])

  // Load and assign web3
  async function loadWeb3() {
    try {
      if (window.ethereum) {
        web3 = new Web3(window.ethereum)
      } else if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider)
      } else {
        web3 = new Web3(
          new Web3.providers.HttpProvider('http://localhost:7545')
        )
      }
    } catch (e) {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      )
    }
  }

  // Load data, balance and assign address
  async function loadBlockchainData() {
    if (!web3.eth) return

    const accounts = await web3.eth.getAccounts()
    const balanceAmount = await web3.eth.getBalance(accounts[0])
    setAccount(accounts[0])
    setBalance(web3.utils.fromWei(balanceAmount, 'ether'))

    const networkId = await web3.eth.net.getId()
    const networkData = SimpleNFT.networks[networkId]

    if (networkData) {
      // @ts-ignore
      const abi: AbiItem = SimpleNFT.abi
      const address = networkData.address
      const mainContract = new web3.eth.Contract(abi, address)

      setContract(mainContract)
      const supply = await mainContract.methods.totalSupply().call()
      setTotalSupply(supply)

      const allColors = await mainContract.methods.getColors().call()

      setSimpleNFTs(allColors)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const handleMinting: SubmitHandler<MintFormData> = async data => {
    try {
      if (simpleNFTs.includes(data.color)) {
        toast({
          title: 'You already added this color',
          status: 'error',
          position: 'top-right',
          duration: 3000
        })

        return
      }
      // mint and assign data on success
      await contract.methods
        .mint(data.color)
        .send({ from: account })
        .once('receipt', () => {
          setSimpleNFTs([...simpleNFTs, data.color])
          setTotalSupply(Number(totalSupply) + 1)

          toast({
            title: 'Minted',
            status: 'success',
            position: 'top-right',
            duration: 3000,
            isClosable: true
          })
        })
    } catch (e) {
      toast({
        title: 'Mint failed',
        status: 'error',
        position: 'top-right',
        duration: 3000
      })
    }
  }

  return (
    <Flex
      direction="column"
      width="100%"
      h="100vh"
      justify="center"
      align="center"
    >
      <Stack textAlign="center" mb="10">
        <Box>
          <Heading as="h1">Simple NFT</Heading>
        </Box>
        <Box>
          <Text fontWeight="light">Wallet</Text>
          {balance ? (
            <>
              <Text fontWeight="extrabold">
                {account} - {balance.slice(0, 5)} ETH
              </Text>
            </>
          ) : (
            <Text>Failed to load wallet</Text>
          )}
        </Box>
      </Stack>

      <Divider w="100px" mb="10" />

      <Stack textAlign="center" mb="5">
        <Heading as="h3" fontSize="2xl">
          Mint a color
        </Heading>
        <Text>{totalSupply} minted</Text>
      </Stack>

      <MintForm onMint={handleMinting} totalSupply={totalSupply} />
    </Flex>
  )
}
