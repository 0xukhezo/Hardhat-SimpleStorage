const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage tests", function () {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Test 1 - Should start with favoriteNumber constant equal to 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), "0");
  });
  it("Test 2 - Should update favoriteNumber constant to 5", async function () {
    const txResponse = await simpleStorage.store("5");
    await txResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    assert.equal(updatedValue.toString(), "5");
  });
});
