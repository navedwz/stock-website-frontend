import { useEffect, useState } from 'react';

export default function StocksPage() {
  const [backendMessage, setBackendMessage] = useState('Loading...');

useEffect(() => {
  async function fetchStocks() { // clearly defined function name
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks`);
      const data = await response.json();
      setBackendMessage(data.message);
    } catch (error) {
      setBackendMessage('Error fetching data from backend.');
    }
  };

  fetchStocks(); // <-- Corrected call
}, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold">Stocks Data Fetch Test</h1>
      <p className="mt-4">Backend Message: {backendMessage}</p>
    </div>
  );
}
