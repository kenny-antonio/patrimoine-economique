import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import Possession from '../../models/possessions/Possession'; 

function App() {
  const [possessions, setPossessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalValeurActuelle, setTotalValeurActuelle] = useState(0); 

  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data loaded:', data);

        const possessionsData = data.find(item => item.model === 'Patrimoine').data.possessions;

        const loadedPossessions = possessionsData.map(possession =>
          new Possession(
            possession.possesseur.nom,
            possession.libelle,
            Number(possession.valeur), // Convertir en nombre
            new Date(possession.dateDebut),
            possession.dateFin ? new Date(possession.dateFin) : null,
            possession.tauxAmortissement || 0,
            possession.valeurConstant || 0 
          )
        );

        setPossessions(loadedPossessions);
      })
      .catch(error => console.error('Erreur lors du chargement des données:', error));
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    if (selectedDate) {
      const updatedPossessions = possessions.map(possession => {
        return new Possession(
          possession.possesseur,
          possession.libelle,
          possession.valeur,
          possession.dateDebut,
          selectedDate,
          possession.tauxAmortissement,
          possession.valeurConstant
        );
      });

      // Calculer le total de la valeur actuelle
      const total = updatedPossessions.reduce((sum, possession) => {
        // Assurez-vous que la valeur retournée est un nombre
        const valeurActuelle = possession.getValeur(selectedDate);
        return sum + (typeof valeurActuelle === 'number' ? valeurActuelle : 0);
      }, 0);

      setPossessions(updatedPossessions);
      setTotalValeurActuelle(total);
    } else {
      alert('Veuillez sélectionner une date.');
    }
  };

  const getValeurInitiale = (possession) => {
    return possession.valeur === 0 ? possession.valeurConstant : possession.valeur;
  };

  // Fonction pour sécuriser l'affichage des valeurs avec un nombre par défaut
  const safeToFixed = (value, decimalPlaces = 2) => {
    const num = Number(value);
    return isNaN(num) ? '0.00' : num.toFixed(decimalPlaces);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <h2>PATRIMOINE ECONOMIQUE</h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Possesseur</th>
                <th>Libelle</th>
                <th>Valeur Initiale</th>
                <th>Valeur Actuelle</th>
                <th>Date de Début</th>
                <th>Date de Fin</th>
                <th>Taux d'Amortissement</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(possessions) && possessions.length === 0 ? (
                <tr>
                  <td colSpan="7">Aucune possession à afficher</td>
                </tr>
              ) : (
                possessions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.possesseur}</td>
                    <td>{item.libelle}</td>
                    <td>{safeToFixed(getValeurInitiale(item))} €</td>
                    <td>{safeToFixed(item.getValeur(selectedDate))} €</td>
                    <td>{item.dateDebut.toLocaleDateString()}</td>
                    <td>{item.dateFin ? item.dateFin.toLocaleDateString() : 'Non définie'}</td>
                    <td>{item.tauxAmortissement} %</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6} className="bg-light p-4 rounded shadow">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Sélectionner une date :</Form.Label>
              <div className="d-flex justify-content-between align-items-center">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy/MM/dd"
                  className="form-control me-2"
                />
                <Button variant="primary" onClick={handleSubmit}>Valider</Button>
              </div>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md={8} className="text-center">
          <h3>Total Patrimoine : {safeToFixed(totalValeurActuelle)} €</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
