import { ethers } from "hardhat";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";

async function main() {

  //  Setting up necessary variables
  const [owner] = await ethers.getSigners();
  const RICHKID = "0x748dE14197922c4Ae258c7939C7739f3ff1db573"
  const contractName = "MerkleTimi"
  const contractSymbol = "MTM"


  // Deploy contract
  const MERKLETIMI = await ethers.getContractFactory("MerkleTimi")
  const MerkleTimiContract = await MERKLETIMI.deploy(contractName, contractSymbol);

  await MerkleTimiContract.deployed()

  console.log(`The Merkle Timi Contract has been deployed at Address: ${MerkleTimiContract.address}`)


  console.log(`Balance of contract: ${await MerkleTimiContract.balanceOf(MerkleTimiContract.address)}`)

  // Transfer to Contract add
  // await MerkleTimiContract.connect(owner).transfer(MerkleTimiContract.address, )



  // Impersonating account
  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  await helpers.impersonateAccount(RICHKID);
  const impersonatedSigner = await ethers.getSigner(RICHKID);


  // Read file and create tree leaf data
  const file = fs.readFileSync("./scripts/data/whitelist.csv")

  const allLines = file.toString("ascii").split("\n")

  const res = []

  for (let i = 1; i < allLines.length; i++) {
    res.push(allLines[i].split(", "));
  }

  console.log(res)



  // Build merkle tree and root

  const tree = StandardMerkleTree.of(res, ["address", "uint256"]);

  console.log(`The Merkle root is: ${tree.root}`)

  fs.writeFileSync("./scripts/data/data.json", JSON.stringify(res));

  fs.writeFileSync("./scripts/data/tree.json", JSON.stringify(tree.dump()));


  // Generate proof
  //
  const verificationTree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("./scripts/data/tree.json")));


  function getProof(addr: any) {
    for (let [i, v] of verificationTree.entries()) {

      if (v[0] == addr) {

        const proof = verificationTree.getProof(v)

        console.log(`Value: ${v[0]}`)
        console.log(`Addr: ${addr}`)
        console.log(`Addr: ${proof}`)
        console.log(`Addr: ${v}`)

        console.log(`Proof: ${proof}`)

        return proof;
      }
    }
  }

  const RichKidProof =await getProof(RICHKID);

  console.log(`RichKidProof: ${RichKidProof}`)



  // Set the merkle root
  await MerkleTimiContract.setMerkleRoot(tree.root)


  // Check Rich kid balance before claiming airdrop
  const BalBefClaim = await MerkleTimiContract.balanceOf(impersonatedSigner.address);
  console.log(`Rich Kid balance before claiming airdrop is: ${BalBefClaim}`);


  // Check contract balance before claiming airdrop
  const CBalBefClaim = await MerkleTimiContract.balanceOf(MerkleTimiContract.address);
  console.log(`Contract balance before claiming airdrop is: ${CBalBefClaim}`);


  // Claim Airdrop
  // const amount = ethers.BigNumber.from("10000000000000000000000000")
  const amount = ethers.utils.parseEther("10000000")
  MerkleTimiContract.connect(impersonatedSigner).claimAirdrop(amount, RichKidProof)

  console.log(`Finished claiming`)


  // Check Rich kid balance after claiming airdrop
  const BalAftClaim = await MerkleTimiContract.balanceOf(impersonatedSigner.address);
  console.log(`Rich Kid balance after claiming airdrop is: ${BalAftClaim}`);


  // Check Contract balance after claiming airdrop
  const CBalAftClaim = await MerkleTimiContract.balanceOf(MerkleTimiContract.address);
  console.log(`Contract balance after claiming airdrop is: ${CBalAftClaim}`);


} 
// 99 999 000 000 000 000 000 000 000
// 10 000 000 000 000 000 000 000 000

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
