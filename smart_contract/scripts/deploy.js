const {ethers} = require("hardhat");

const main = async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    
    let RealEstateToken = await ethers.getContractFactory('RealEstateToken');
    let realEstateTokenInstance = await RealEstateToken.deploy();
    await realEstateTokenInstance.waitForDeployment()
    // const result = await realEstateTokenInstance.getToken(0); // Use a valid token ID
    console.log("Transactions address: ", await realEstateTokenInstance.getAddress())
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
runMain();
