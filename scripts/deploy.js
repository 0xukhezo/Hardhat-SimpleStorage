const { ethers, run, network } = require("hardhat");

const main = async () => {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying contract...");

  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API) {
    await simpleStorage.deployTransaction.wait(6);
    console.log(simpleStorage.address);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(currentValue.toString());

  const txResponse = await simpleStorage.store("5");
  await txResponse.wait(1);
  const updateValue = await simpleStorage.retrieve();
  console.log(updateValue.toString());
};

const verify = async (contractAddress, args) => {
  console.log("Verifying the contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
