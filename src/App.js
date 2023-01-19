import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Section from './components/Section';
import Product from './components/Product';

// ABIs
import Dappazon from './abis/Dappazon.json';

// Config
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [dappazon, setDappazon] = useState(null);

  const [account, setAccount] = useState(null);

  const [electronics, setElectronics] = useState(null);
  const [clothing, setClothing] = useState(null);
  const [toys, setToys] = useState(null);

  const [item, setItem] = useState({});
  const [toggle, setToggle] = useState(false);

  const togglePop = (item) => {
    setItem(item);
    toggle ? setToggle(false) : setToggle(true);
  };

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();
    console.log(network);

    const dappazon = new ethers.Contract(
      config[network.chainId].dappazon.address,
      Dappazon,
      provider
    );
    setDappazon(dappazon);

    const items = [];

    for (var i = 0; i < 9; i++) {
      const item = await dappazon.items(i + 1);
      items.push(item);
    }

    console.log(items);

    const electronics = items.filter((item) => item.category === 'electronics');
    const clothing = items.filter((item) => item.category === 'clothing');
    const toys = items.filter((item) => item.category === 'toys');

    setElectronics(electronics);
    setClothing(clothing);
    setToys(toys);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <h2>Dappazon Best Sellers</h2>

      {electronics && clothing && toys && (
        <>
          <Section
            title={'Clothing & Jewelry'}
            items={clothing}
            togglePop={togglePop}
          />
          <Section
            title={'Electronics & Gadgets'}
            items={electronics}
            togglePop={togglePop}
          />
          <Section title={'Toys & Gaming'} items={toys} togglePop={togglePop} />
        </>
      )}

      {toggle && (
        <Product
          item={item}
          provider={provider}
          account={account}
          dappazon={dappazon}
          togglePop={togglePop}
        />
      )}
    </div>
  );
}

export default App;
//make sure that metamask is set up use the private key set up hardhat to connect it then add const loadBlockchainData and console..log
//use effect is a hook that connects the data
//add a loadblockchaindata add the accounts add an account and console.log(account)
//import the usestate
//console.log the account so you can see the account info
//add navigation and set account to account and setaccount
//add the const electronics and add the clothing and electronics  and make sure that the loadblockchaindata is added
//what were going to want to do is add the network.chainId to the address
//abi is already preloaded so dont have to worry about that in the abis folder
//what is the abi it is an abstract binary interface
//how contract works
//then loop through the items and console.log once you connect the smart contract
//add the electronics and console.log the categories of each category
//add the electronics clothing and toys
//then from there set electronics set clothing and then set toys
//Going to render out each section
//then from there go to the section component
//add toggle this way the thing pops up when you click on it
//then go to your section component
//go back to app.js and then go to togglePop and add console.log(togglepop)
