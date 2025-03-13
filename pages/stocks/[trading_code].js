import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function StockDetails() {
  const router = useRouter();
  const { trading_code } = router.query;

  const [stock, setStock] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (trading_code) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks`)
        .then(res => res.json())
        .then(data => {
          const foundStock = data.find(s => s.trading_code === trading_code);
          if (foundStock) {
            setStock(foundStock);
          } else {
            setError('Stock not found');
          }
        })
        .catch(() => setError('Error fetching stock data'));

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/history/${trading_code}`)
        .then(res => res.json())
        .then(data => setHistoricalData(data))
        .catch(() => setError('Error fetching historical data'));
    }
  }, [trading_code]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-4">📌 Stock Details: {trading_code}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {!stock && !error && <p>Loading details...</p>}

      {stock && (
        <div className="mt-5 bg-white p-6 shadow-lg rounded-lg">
          <p><strong>Trading Code:</strong> {stock.trading_code}</p>
          <p><strong>Last Traded Price (LTP):</strong> {stock.ltp}</p>
          <p><strong>Day High:</strong> {stock.high}</p>
          <p><strong>Day Low:</strong> {stock.low}</p>
          <p><strong>Change:</strong> {stock.change}</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6">📊 Price Trend (Last 7 Days)</h2>
      {historicalData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#007bff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}

      <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => router.push('/stocks')}>← Back to All Stocks</button>
    </div>
  );
}
