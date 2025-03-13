import { useEffect, useState } from 'react';

export default function StocksPage() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage('Error fetching data.'));
  }, []);

  const [message, setMessage] = useState('');

  return (
    <div style={{padding: "20px"}}>
      <h1 style={{fontSize: "24px", fontWeight: "bold"}}>Stocks Data Fetch Test</h1>
      <p>Backend says: {message || "Loading..."}</p>
    </div>
  );
}
