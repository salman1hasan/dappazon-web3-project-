// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon {
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => uint256) public orderCount;

    event Buy(address buyer, uint256 orderId, uint256 itemId);
    event List(string name, uint256 cost, uint256 quantity);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        // Create Item
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        // Add Item to mapping
        items[_id] = item;

        // Emit event
        emit List(_name, _cost, _stock);
    }

    function buy(uint256 _id) public payable {
        // Fetch item
        Item memory item = items[_id];

        // Require enough ether to buy item
        require(msg.value >= item.cost);

        // Require item is in stock
        require(item.stock > 0);

        // Create order
        Order memory order = Order(block.timestamp, item);

        // Add order for user
        orderCount[msg.sender]++; // <-- Order ID
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Subtract stock
        items[_id].stock = item.stock - 1;

        // Emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}

 //this is a state variable solidity static typed programming language, in solidity you have to tell it what type of variable it is  give it any value and visibility is public 
 //strings for character, this value is written to the blockchain itself 
 //add a constructor for the name this way you can add string public name

 //how to use beforeHooks going to be writing about 12. Dont want to rerun it after it every test

 //Want to create an owner of the smart contract. What is this owner and what does this mean. 
 //This is more like a shopify where you recieve the funds of a purchase rather than people being able to upload their own nfts

 //Going to save this to a block chain wallet and create state and owner
 //blockchain address and etherum address

 //owner is the variable, solidity has a global message called sender. 

 //remove the name not really needed

 //list products
 //buy products
 //withdraw funds

 //in a function can add a function list and the code goes there

 //whenever were creating a product need an id a name a category an image a cost rating and a stock.abi//uint256 is a number and a string is memory
 //0,1,....

 //how do you model something on the blockchain. 

 //struct is a data structure //and add all the necessary items , id name category image cost rating and stock
 //Create item struct and then have to save the item struct

 //mapping lets us save key and value pairs 

 //Store a value in the whey, the smallest subdivision of ether, its kind of the penny of etherum in usd

 //want to emit an event on the blockchain
 //solidity lets you create your own events that can be emitted 

 //anytime function is called someone can subscribe to event and get a notification about it

 //create an event List(string name, uint 256, cost 256) uint 256 quantity
 //emit list name cost stock and go to dappazon.js and emit the event as well 

 //Since only one person is able to list the products you dont want anyone else to be able to list products on there,
 //so you have to create a special function called require

//add the msg.sender == owner

//Going to create a modifier in solidity, make sure to do it before the function body and not after
//the idea to do this for the function buy uint256 _id is to add the public

//Recieve Crypto 
//Create an order 
//Substract stock
//Emit event

//have to create a struct order uint256 
//then add an item and the item becomes the item that is down there

//Each order needs to have a unique timestamp when it was created 

//Epochconverter.com is a time stamp and has a time stamp and let us know the time in seconds 
//have to create a mapping for the order account
//add an address and uint256 and add the address mapping uint256 order and public order 

//Add the order for user

//create a new list called buy and add the address buyer order id and the item
//then you have to emit the event like this

//Im going to add some requirements to my own and make sure that they have enough ether to buy it

//Make sure that the item is in stock with using the require function
//Last thing i want to show you is how to widthdraw the funds

//this withdraw and public only Owner and add the bool success and the owner.call {value: address(this).balance} ("")
//require

//Were going to use preferred pattern and add owner.call sends them a messsage and give it value and add this and add the balance

//run npx hardhat node

//then go to deploy.js

//In the items.json files there are already files there for you 