// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintingNFT is ERC721Enumerable, Ownable {

    mapping(uint256=>uint256) public prices;
    mapping(uint256=>uint256) public maxCounts;
    mapping(uint256=>uint256) public currentCounts;

    constructor() ERC721("Real Estate Agent", "REA") {        
        prices[1] = 1.0 ether;
        prices[2] = 0.5 ether;
        prices[3] = 0.1 ether;
        maxCounts[1] = 11;
        maxCounts[2] = 50;
        maxCounts[3] = 50;
    }

    function mint(uint256 category) public payable{		
        require(currentCounts[category] + 1 < maxCounts[category], "Can't exceed Max Count");        
		require(msg.value >= prices[category], "Insufficient Payment");
        uint256 totalSupply = totalSupply();        
        _mint(msg.sender, totalSupply + 1);
		currentCounts[category]++;
    }

    function setPrice(uint256 category, uint256 newPrice) public onlyOwner 
    {
        prices[category] = newPrice;
    }

    function setMaxCounts(uint256 category, uint256 newMaxCount) public onlyOwner 
    {
        maxCounts[category] = newMaxCount;
    }

    function supportsInterface(bytes4 interfaceId) public view
        override(ERC721Enumerable) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
