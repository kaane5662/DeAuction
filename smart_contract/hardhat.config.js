// require("@nomicfoundation/hardhat-toolbox")

require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/_lkuy16czLSxFrVaSKzzSspS831IK35f",
      accounts: ["88077e27035f18da96e5846a2c427e7eaeb925d7fc4b962e4369c2134d2a7219"],
    },
    hardhat: {
      chainId: 31337
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};
