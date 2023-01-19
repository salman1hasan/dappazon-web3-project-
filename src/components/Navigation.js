import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav>
      <div className="nav__brand">
        <h1>Dappazon</h1>
      </div>

      <input type="text" className="nav__search" />

      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      )}

      <ul className="nav__links">
        <li>
          <a href="#Clothing & Jewelry">Clothing & Jewelry</a>
        </li>
        <li>
          <a href="#Electronics & Gadgets">Electronics & Gadgets</a>
        </li>
        <li>
          <a href="#Toys & Gaming">Toys & Gaming</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
//go to navigation add the <h1> Dappzon and then add nav_search and then add button and add nav_coonect
//and add account and then add </button>
//with slice you can abbreviate it
//Add navlinks below the navigation bar
// Add an account ? (
//<button and then type="button"
//and then from there add another button and classname and onclick with a connectHandler and add connect
//things missing, a logout functionality but dont worry about that too much yet
