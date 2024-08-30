import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePossessionPage.css'; // Importez votre fichier CSS

function CreatePossessionPage() {
  const navigate = useNavigate();
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [taux, setTaux] = useState('');

  const createPossession = () => {
    const newPossession = { libelle, valeur, dateDebut, taux };
    fetch('/possession', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPossession)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la création de la possession');
      }
      return response.text();
    })
    .then(() => navigate('/possession'))
    .catch(error => console.error('Erreur:', error));
  };

  return (
    <div className="container">
      <h1 className="title">Créer une Possession</h1>
      <div className="form-group">
        <label htmlFor="libelle">Libelle</label>
        <input 
          id="libelle"
          type="text" 
          className="input" 
          placeholder="Libelle" 
          value={libelle} 
          onChange={(e) => setLibelle(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label htmlFor="valeur">Valeur</label>
        <input 
          id="valeur"
          type="number" 
          className="input" 
          placeholder="Valeur" 
          value={valeur} 
          onChange={(e) => setValeur(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label htmlFor="dateDebut">Date de Début</label>
        <input 
          id="dateDebut"
          type="date" 
          className="input" 
          value={dateDebut} 
          onChange={(e) => setDateDebut(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label htmlFor="taux">Taux</label>
        <input 
          id="taux"
          type="number" 
          className="input" 
          placeholder="Taux" 
          value={taux} 
          onChange={(e) => setTaux(e.target.value)} 
        />
      </div>
      <button className="button" onClick={createPossession}>Créer</button>
    </div>
  );
}

export default CreatePossessionPage;
