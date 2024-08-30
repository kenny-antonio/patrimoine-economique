import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdatePossessionPage() {
  const { libelle } = useParams();  // Récupère le libelle de la possession depuis l'URL
  const [possession, setPossession] = useState(null);
  const [dateFin, setDateFin] = useState('');
  const navigate = useNavigate();  // Pour rediriger après la mise à jour

  useEffect(() => {
    fetch(`/possession/${libelle}`)
      .then(res => {
        console.log('Status:', res.status);
        console.log('Headers:', res.headers.get('content-type'));
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text(); // Récupère la réponse sous forme de texte
      })
      .then(text => {
        console.log('Response Text:', text); // Affichez la réponse brute pour déboguer
        try {
          const data = JSON.parse(text); // Essayez de parser en JSON
          setPossession(data);
          setDateFin(data.dateFin || '');
        } catch (e) {
          console.error('Erreur lors du parsing JSON:', e);
        }
      })
      .catch(error => console.error('Erreur lors du chargement des données:', error));
  }, [libelle]);

  const updatePossession = () => {
    fetch(`/possession/${libelle}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dateFin })
    })
    .then(() => navigate('/'))  // Redirige vers la page principale après la mise à jour
    .catch(error => console.error('Erreur lors de la mise à jour:', error));
  };

  if (!possession) return <div>Loading...</div>;

  return (
    <div>
      <h1>Mettre à jour la Possession</h1>
      <input 
        type="text" 
        value={possession.libelle} 
        disabled 
      />
      <input 
        type="date" 
        value={dateFin} 
        onChange={(e) => setDateFin(e.target.value)} 
      />
      <button onClick={updatePossession}>Update</button>
    </div>
  );
}

export default UpdatePossessionPage;
