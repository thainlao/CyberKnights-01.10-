const hre = require("hardhat");

async function main() {

  const CyberKnights = await hre.ethers.getContractFactory("CyberKnights");
  const gasPrice = await CyberKnights.signer.getGasPrice();
  console.log(`Current gas price: ${gasPrice}`);

  const estimatedGas = await CyberKnights.signer.estimateGas(
    CyberKnights.getDeployTransaction(),
  );
  console.log(`Estimated gas: ${estimatedGas}`);

  const deploymentPrice = gasPrice.mul(estimatedGas);
  const deployerBalance = await CyberKnights.signer.getBalance();
  console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
  console.log(`Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);
  if (deployerBalance.lt(deploymentPrice)) {
    throw new Error(
      `Insufficient funds. Top up your account balance by ${ethers.utils.formatEther(
        deploymentPrice.sub(deployerBalance),
      )}`,
    );
  }
  const cyberKnights = await CyberKnights.deploy();

  await cyberKnights.deployed();

  console.log("CyberKnights deployed to:", cyberKnights.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});