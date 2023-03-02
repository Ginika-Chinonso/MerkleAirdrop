// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MerkleTimi is ERC20{

    address public owner;
    bytes32 public merkleroot;

    constructor(string memory _name, string memory _symbol, bytes32 _merkleroot) ERC20(_name, _symbol){
        owner = msg.sender;
        merkleroot = _merkleroot;
    }

    function onlyOwner() internal view {
        if (msg.sender != owner) revert("Only owner can call this function");
    }

    function setMerkleRoot(bytes32 _root) public {
        onlyOwner();
        merkleroot = _root;
    }

    function verifyProof(address _addr, bytes32 _proof) internal view{}


    
}
