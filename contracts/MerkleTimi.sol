// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract MerkleTimi is ERC20{

    address public owner;
    bytes32 private merkleroot;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol){
        owner = msg.sender;
    }

    function onlyOwner() internal view {
        if (msg.sender != owner) revert("Only owner can call this function");
    }

    function setMerkleRoot(bytes32 _root) public {
        onlyOwner();
        merkleroot = _root;
    }

    function verifyProof(address _addr, uint256 _amount, bytes32[] memory _proof) internal view{
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(_addr, _amount))));
        if (!MerkleProof.verify(_proof, merkleroot, leaf)) revert("Invalid Proof");
    }


    function claimAirdrop(uint256 _amount, bytes32[] memory _proof) public {
        verifyProof(msg.sender, _amount, _proof);
        uint amount = _amount * 10**decimals();
        _mint(msg.sender, amount);
    }


    
}
