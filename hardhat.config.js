require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("dotenv").config();

const GOERLI_URL_RPC = process.env.URL_RPC_GOERLI;
const LOCALHOST_URL_RPC = process.env.URL_RPC_LOCALHOST;
const PRIVATE_KEY_ACCOUNT_GOERLI = process.env.PRIVATE_KEY_GOERLI;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API;
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_URL_RPC,
      accounts: [PRIVATE_KEY_ACCOUNT_GOERLI],
      chainId: 5,
    },
    localhost: {
      url: LOCALHOST_URL_RPC,
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
