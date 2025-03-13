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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">📈 Real-time DSE Stock Data</h1>
      {error && <p className="text-red-600">{error}</p>}
      {!error && stocks.length === 0 && <p>Loading data clearly...</p>}
      {stocks.length > 0 && (
        <table className="w-full text-center border-collapse border border-gray-200 mt-5">
          <thead className="bg-blue-100">
            <tr>
              <th className="border p-2">Trading Code</th>
              <th className="border border-gray-300">LTP</th>
              <th className="border border-gray-200">High</th>
              <th className="border border-gray-200">Low</th>
              <th className="border border-gray-200">Change</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock => (
              <tr key={stock.trading_code} className="hover:bg-gray-100">
                <td className="border border-gray-200 p-2">{stock.trading_code}</td>
                <td className="border border-gray-200">{stock.ltp}</td>
                <td className="border border-gray-200">{stock.high}</td>
                <td className="border border-gray-200">{stock.low}</td>
                <td className="border border-gray-200">{stock.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
