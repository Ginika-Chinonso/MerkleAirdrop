# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```


# RESOURCES
* https://github.com/OpenZeppelin/merkle-tree
* https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/cryptography/MerkleProof.sol



/////////////////////////////////////////////////////////////////////

Create a dummy csv file that has 10 data sets
address,amount
Write a script that reads from that csv and creates a merkle tree from it while storing the root in the contract
the tree and the data must be written to separate json files for easier access while testing
At least one address must claim




build a dummmy data set of 10 adddresses
address, amount of token. build a csv dummy data. amount is 1000
write a script to read csv and create a merkle tree.
merkle tree must store the root to a different file.
typescript

