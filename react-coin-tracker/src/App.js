import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const handleInput = (event) => {
    setAmount(event.target.value);
  };
  console.log('amount', amount);

  const handlePrice = (event) => {
    const {
      target: { value },
    } = event;
    setPrice(coins[value].quotes.USD.price);
  };
  console.log('price', price);

  return (
    <div>
      <h1>The Coins ({loading ? '' : coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={handlePrice}>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.rank - 1}>
              {coin.name} ({coin.symbol})
            </option>
          ))}
        </select>
      )}
      <div>
        <h2>1 COIN = {price} USD</h2>
        <span>
          <input
            type='number'
            placeholder='USD'
            value={amount}
            onChange={handleInput}
          />{' '}
          USD
        </span>
        <span> = </span>
        <strong>
          {amount / price} {amount / price <= 1 ? 'COIN' : 'COINS'}
        </strong>
      </div>
    </div>
  );
}

export default App;
