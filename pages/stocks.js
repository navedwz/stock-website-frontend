import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StocksPage() {
  const [stocks, setStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // Default filter: Show all
  const [error, setError] = useState('');

  // ✅ Ensuring data is loaded properly
  useEffect(() => {
    async function fetchStockData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks`);
        const data = await response.json();
        console.log('Stock data:', data); // Debugging
        setStocks(data);
      } catch (error) {
        setError('Error fetching stock data.');
      }
    }
    fetchStockData();
  }, []);

  // ✅ Fixing filter logic
  const filteredStocks = stocks.filter(stock => {
    if (!stock.trading_code) return false;
    const matchesSearch = stock.trading_code.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'top-gainers') {
      return matchesSearch && parseFloat(stock.change) > 0;
    }
    if (filter === 'top-losers') {
      return matchesSearch && parseFloat(stock.change) < 0;
    }
    return matchesSearch; // Default: Show all stocks
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 flex items-center">
        📈 Real-time DSE Stock Data
      </h1>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by Trading Code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded mt-2 md:mt-0"
        >
          <option value="all">📊 All Stocks</option>
          <option value="top-gainers">🟢 Top Gainers</option>
          <option value="top-losers">🔴 Top Losers</option>
        </select>
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {!error && filteredStocks.length === 0 && <p>No results found.</p>}

      {/* ✅ Fix: Ensure stocks table is visible */}
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
            {filteredStocks.map(stock => (
              <tr key={stock.trading_code} className="hover:bg-gray-100">
                <td className="border p-2 text-blue-500 font-bold">
                  <Link href={`/stocks/${stock.trading_code}`}>{stock.trading_code}</Link>
                </td>
                <td className="border">{stock.ltp}</td>
                <td className="border">{stock.high}</td>
                <td className="border">{stock.low}</td>
                <td className={`border ${parseFloat(stock.change) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
