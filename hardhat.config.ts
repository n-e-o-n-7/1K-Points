import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { INFURA_API_KEY,ACCOUNT_PRIVATE_KEY,ETHERSCAN_API_KEY }= process.env

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    },
    goerli:{
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
