import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        //@ts-ignore
        url: process.env.MAINNET_RPC
      }
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API
  }
};

export default config;
