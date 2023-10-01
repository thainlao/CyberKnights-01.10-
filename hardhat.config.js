require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const dotenv = require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: 'https://goerli.infura.io/v3/86b3413b9eb14208a976db6620ac9f9a',
      accounts: [process.env.METAMASK],
    },
  },  
 etherscan: {
  apiKey: process.env.ETHERSCAN,
 },
};