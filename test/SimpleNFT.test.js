require('chai').use(require('chai-as-promised')).should()

const SimpleNFT = artifacts.require('./src/contracts/SimpleNFT.sol')

contract('SimpleNFT', (accounts) => {
  let contract

  beforeEach(async () => {
    contract = await SimpleNFT.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address

      assert.notEqual(address, '')
      assert.notEqual(address, '0x0')
      assert.notEqual(address, 0x0)
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Simple NFT')
    })

    it('has a symbol', async () => {
      const name = await contract.symbol()
      assert.equal(name, 'SNFT')
    })
  })

  describe('minting', async () => {
    it('creates a new token', async () => {
      const result = await contract.mint('#EC058E')

      const totalSupply = await contract.totalSupply()
      assert.equal(totalSupply, 1)

      const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), 1)
      assert.equal(event.from, '0x0000000000000000000000000000000000000000')
      assert.equal(event.to, accounts[0])

      await contract.mint('#EC058E').should.be.rejected
    })
  })

  describe('indexing', async () => {
    it('lists colors', async () => {
      await contract.mint('#5D150D')
      await contract.mint('#FFFFFF')
      await contract.mint('#000000')

      const totalSupply = await contract.totalSupply()

      let colors
      let result = []

      for (var i = 1; i <= totalSupply; i++) {
        color = await contract.colors(i - 1)
        result.push(color)
      }

      let expected = ['#EC058E', '#5D150D', '#FFFFFF', '#000000']

      assert.equal(result.join(','), expected.join(','))
    })
  })
})
