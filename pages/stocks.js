import { useEffect, useState } from 'react';

export default function StocksPage() {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks`)
      .then(res => res.json())
      .then(data => setStocks(data))
      .catch(err => setError('Error fetching data'));
  }, []);

  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState('');

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Real-time DSE Stock Data</h1>

      {error && <p>{error}</p>}
      {!error && stocks.length === 0 && <p>Loading stock data...</p>}

      {!error && stocks.length > 0 && (
        <table style={{ width: '100%', border: '1px solid black', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black' }}>Trading Code</th>
              <th style={{ border: '1px solid black' }}>LTP</th>
              <th style={{ border: '1px solid black' }}>High</th>
              <th style={{ border: '1px solid black' }}>Low</th>
              <th style={{ border: '1px solid black' }}>Change</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock => (
              <tr key={stock.trading_code}>
                <td style={{ border: '1px solid black' }}>{stock.trading_code}</td>
                <td style={{ border: '1px solid black' }}>{stock.ltp}</td>
                <td style={{ border: '1px solid black' }}>{stock.high}</td>
                <td style={{ border: '1px solid black' }}>{stock.low}</td>
                <td style={{ border: '1px solid black' }}>{stock.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
