import { useEffect, useState } from 'react';
import Link from 'next/link';

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
      {!error && stocks.length === 0 && <p>Loading data...</p>}
      {stocks.length > 0 && (
        <table className="w-full text-center border-collapse border border-gray-200 mt-5">
          <thead className="bg-blue-100">
            <tr>
              <th className="border p-2">Trading Code</th>
              <th className="border">LTP</th>
              <th className="border">High</th>
              <th className="border">Low</th>
              <th className="border">Change</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock => (
              <tr key={stock.trading_code} className="hover:bg-gray-100">
                <td className="border p-2 text-blue-500 font-bold">
                  <Link href={`/stocks/${stock.trading_code}`}>{stock.trading_code}</Link>
                </td>
                <td className="border">{stock.ltp}</td>
                <td className="border">{stock.high}</td>
                <td className="border">{stock.low}</td>
                <td className="border">{stock.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
