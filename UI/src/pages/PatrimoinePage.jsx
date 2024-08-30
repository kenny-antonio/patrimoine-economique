import React, { useState } from 'react';

function PatrimoinePage() {
  const [date, setDate] = useState('');
  const [patrimoine, setPatrimoine] = useState(null);

  const fetchPatrimoine = () => {
    // Fetch patrimoine value from the backend
    fetch(`/patrimoine/${date}`)
      .then(res => res.json())
      .then(data => setPatrimoine(data.valeur));
  };

  return (
    <div>
      <h1>Patrimoine</h1>
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <button onClick={fetchPatrimoine}>Validate</button>
      {patrimoine && <p>Valeur du Patrimoine: {patrimoine}</p>}
      {/* Implement the chart with Chart.js */}
    </div>
  );
}

export default PatrimoinePage;
