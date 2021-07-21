/* SPDX-License-Identifier: MIT */
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SimpleNFT is ERC721 {
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() ERC721("Simple NFT", "SNFT") {}

    function mint(string memory _color) public {
        require(!_colorExists[_color]);

        colors.push(_color);

        uint256 _id = colors.length;
        _mint(msg.sender, _id);

        _colorExists[_color] = true;
    }

    function totalSupply() public view returns (uint256) {
        return colors.length;
    }

    function getColors() public view returns (string[] memory) {
        return colors;
    }
}
