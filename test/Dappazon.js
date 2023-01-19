const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

const ID = 1;
const NAME = 'Shoes';
const CATEGORY = 'Clothing';
const IMAGE =
  'https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg';
const COST = tokens(1);
const RATING = 4;
const STOCK = 5;

describe('Dappazon', () => {
  let dappazon;
  let deployer, buyer;

  beforeEach(async () => {
    //Setup Accounts
    [deployer, buyer] = await ethers.getSigners();

    //deploy contract
    const Dappazon = await ethers.getContractFactory('Dappazon');
    dappazon = await Dappazon.deploy();
  });

  describe('Deployment', () => {
    it('Sets the owner', async () => {
      expect(await dappazon.owner()).to.equal(deployer.address);
    });
  });

  describe('Listing', () => {
    let transaction;

    beforeEach(async () => {
      // List a item
      transaction = await dappazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();
    });

    it('Returns item attributes', async () => {
      const item = await dappazon.items(ID);

      expect(item.id).to.equal(ID);
      expect(item.name).to.equal(NAME);
      expect(item.category).to.equal(CATEGORY);
      expect(item.image).to.equal(IMAGE);
      expect(item.cost).to.equal(COST);
      expect(item.rating).to.equal(RATING);
      expect(item.stock).to.equal(STOCK);
    });

    it('Emits List event', () => {
      expect(transaction).to.emit(dappazon, 'List');
    });
  });

  describe('Buying', () => {
    let transaction;

    beforeEach(async () => {
      // List a item
      transaction = await dappazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();

      // Buy a item
      transaction = await dappazon.connect(buyer).buy(ID, { value: COST });
      await transaction.wait();
    });

    it("Updates buyer's order count", async () => {
      const result = await dappazon.orderCount(buyer.address);
      expect(result).to.equal(1);
    });

    it('Adds the order', async () => {
      const order = await dappazon.orders(buyer.address, 1);
      expect(order.time).to.be.greaterThan(0);
      expect(order.item.name).to.equal(NAME);
    });

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(dappazon.address);
      expect(result).to.equal(COST);
    });

    it('Emits Buy event', () => {
      expect(transaction).to.emit(dappazon, 'Buy');
    });
  });

  describe('Withdrawing', () => {
    let balanceBefore;

    beforeEach(async () => {
      // List a item
      let transaction = await dappazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();

      // Buy a item
      transaction = await dappazon.connect(buyer).buy(ID, { value: COST });
      await transaction.wait();

      // Get Deployer balance before
      balanceBefore = await ethers.provider.getBalance(deployer.address);

      // Withdraw
      transaction = await dappazon.connect(deployer).withdraw();
      await transaction.wait();
    });

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(dappazon.address);
      expect(result).to.equal(0);
    });
  });
});

//this is a place where we can write test contracts to check and check the name and we can check it a couple different ways
//automating testing helps you check code, can write the test. Going to use javascript to write it out
//Testing is incredibily important and theres a lot of risk and you want to make sure that its

//has the chai assertion library and uses solidity, await is dappazon
//const name can = dappazon theres other ways to write as well.
//Ether is a project that connects something to the blockchain

//how to use beforeHooks going to be writing about 12. Dont want to rerun it after every test
//then move the const dappazon and the await ethers.getContractFactory and this should deploy the contract
//describe listing products and buying products etc

//have to fetch the deployer address first

//what console.log await what it does is deploy all the addresses deployed by ether and the dappazon
//spins a bunch of fake addresses with test accounts to check

//Add a deployer and add a buyer

//name not really needed

//copy paste the describe and the listing and add a transaction.wait()
//add const item = await dappazon.items(1)

//Calling a list function in dappazon in sol in the list id name category image cost
//rating //stock

//dappazon what we do is make a transaction and add the listing and the return item attributes
//Create a bunch of variables this way dont have to consistently make id=1 so were going to make ID

//Putting images on the ipfs

//with etherum theres 18 0's

//So have to copy and paste the listing and then from there with the transaction and the before each
//have to add a connect and await transaction.wait()
//then transaction.connect(buyer) and add the id and then from there have to add the it emits list event away and gotta replace it

//Updates the contract balance add the async and add the const result = await ethers.provider.getBalance(dappazon.address)
//Expect result.to.equal and cost

//Create an updates order account and add the emit event and then add the buy
//add the withdraw testing stuff and add it is similr to the buying
