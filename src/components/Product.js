import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Rating from './Rating';

import close from '../assets/close.svg';

const Product = ({ item, provider, account, dappazon, togglePop }) => {
  const [order, setOrder] = useState(null);
  const [hasBought, setHasBought] = useState(false);

  const fetchDetails = async () => {
    const events = await dappazon.queryFilter('Buy');
    const orders = events.filter(
      (event) =>
        event.args.buyer === account &&
        event.args.itemId.toString() === item.id.toString()
    );

    if (orders.length === 0) return;

    const order = await dappazon.orders(account, orders[0].args.orderId);
    setOrder(order);
  };

  const buyHandler = async () => {
    const signer = await provider.getSigner();

    // Buy item...
    let transaction = await dappazon
      .connect(signer)
      .buy(item.id, { value: item.cost });
    await transaction.wait();

    setHasBought(true);
  };

  useEffect(() => {
    fetchDetails();
  }, [hasBought]);

  return (
    <div className="product">
      <div className="product__details">
        <div className="product__image">
          <img src={item.image} alt="Product" />
        </div>
        <div className="product__overview">
          <h1>{item.name}</h1>

          <Rating value={item.rating} />

          <hr />

          <p>{item.address}</p>

          <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>

          <hr />

          <h2>Overview</h2>

          <p>
            {item.description}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem,
            iusto, consectetur inventore quod soluta quos qui assumenda aperiam,
            eveniet doloribus commodi error modi eaque! Iure repudiandae
            temporibus ex? Optio!
          </p>
        </div>

        <div className="product__order">
          <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>

          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </strong>
          </p>

          {item.stock > 0 ? <p>In Stock.</p> : <p>Out of Stock.</p>}

          <button className="product__buy" onClick={buyHandler}>
            Buy Now
          </button>

          <p>
            <small>Ships from</small> Dappazon
          </p>
          <p>
            <small>Sold by</small> Dappazon
          </p>

          {order && (
            <div className="product__bought">
              Item bought on <br />
              <strong>
                {new Date(
                  Number(order.time.toString() + '000')
                ).toLocaleDateString(undefined, {
                  weekday: 'long',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}
              </strong>
            </div>
          )}
        </div>

        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div>
  );
};

export default Product;
//add the rating add the hr and the p tag ad the h2 tag and the hr and the h2 and the p tag with a div then add the div className
//and also add an h1 tag with product order and description
//Add free delivery and add <string> and add the new Date(Date.now()+34500000).toLocaleDateString(undefined,{weekday: 'long}),month, day, and numeric
//Create an item.stock >0 and add the <p> tag and in stock or out of stock similar to the login
//Create a button product__buy and add onclick ={buyHandler}> buy Now and a button
//Create buyHandler and console.log("buying")
//Also make sure its async as well and add the ships from dappazon sold by dappazon
//create a button to close it and the x closes the pop up screen
//Add this text to the page to check the order, check for the order and the product bought item bought on <br/> and add <strong and add the date and
//make sure the locale date is there as well
//Add an order hook
//add a buyHandler that talks to the blockchain, import the dappazon contract and let transaction = dappazon
//made purchase inside of test and add the dappazon.connect(signer).buy(item.id,{value: item.cost })
//add await transaction.wait()
