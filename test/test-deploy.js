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
  it("Test 3 - Should add a person to array people", async function () {
    const personAdded = await simpleStorage.addPerson("Alvaro", "5");
    await personAdded.wait(1);
    const people = await simpleStorage.people(0);
    assert.equal(people[0].toString(), "5");
    assert.equal(people[1].toString(), "Alvaro");
  });
});
