import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Possession from '../../../models/possessions/Possession';

function PossessionPage() {
  const [possessions, setPossessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalValeurActuelle, setTotalValeurActuelle] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://patrimoine-economique-ux65.onrender.com/possession')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(data => {
        const possessionsData = data.data.possessions[0].data.possessions;
        const loadedPossessions = possessionsData.map(possession =>
          new Possession(
            possession.possesseur.nom,
            possession.libelle,
            possession.valeur,
            new Date(possession.dateDebut),
            possession.dateFin ? new Date(possession.dateFin) : null,
            possession.tauxAmortissement || 0,
            possession.valeurConstante || 0
          )
        );

        setPossessions(loadedPossessions);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des données:', error);
        setError('Impossible de charger les données des possessions.');
      });
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
          possession.valeurConstante
        );
      });

      const total = updatedPossessions.reduce((sum, possession) => {
        return sum + possession.getValeur(selectedDate);
      }, 0);

      setPossessions(updatedPossessions);
      setTotalValeurActuelle(total);
    } else {
      alert('Veuillez sélectionner une date.');
    }
  };

  const getValeurInitiale = (possession) => {
    return possession.valeur === 0 ? possession.valeurConstante : possession.valeur;
  };

  const closePossession = (libelle) => {
    console.log('Tentative de clôturer la possession:', libelle);
  
    fetch(`/possession/${libelle}/close`, { method: 'PUT' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la clôture de la possession');
        }
        return response.json();
      })
      .then(() => {
        console.log('Possession clôturée avec succès');
        setPossessions(possessions.filter(p => p.libelle !== libelle));
      })
      .catch(error => {
        console.error('Erreur lors de la fermeture de la possession:', error);
      });
  };
  
  
  const deletePossession = (libelle) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette possession ?')) {
      fetch(`/possession/${libelle}`, { method: 'DELETE' })
        .then(() => setPossessions(possessions.filter(p => p.libelle !== libelle)))
        .catch(error => console.error('Erreur lors de la suppression de la possession:', error));
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <h2>PATRIMOINE ECONOMIQUE</h2>
        </Col>
      </Row>

      {error && (
        <Row className="justify-content-center mb-4">
          <Col md={8} className="text-center">
            <div className="alert alert-danger">{error}</div>
          </Col>
        </Row>
      )}

      <Row className="justify-content-center">
        <Col md={20}>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {possessions.length === 0 ? (
                <tr>
                  <td colSpan="8">Aucune possession à afficher</td>
                </tr>
              ) : (
                possessions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.possesseur}</td>
                    <td>{item.libelle}</td>
                    <td>{getValeurInitiale(item).toFixed(2)} €</td>
                    <td>{item.getValeur(selectedDate).toFixed(2)} €</td>
                    <td>{new Date(item.dateDebut).toLocaleDateString()}</td>
                    <td>{item.dateFin ? new Date(item.dateFin).toLocaleDateString() : 'Non définie'}</td>
                    <td>{item.tauxAmortissement} %</td>
                    <td>
                      <Link to={`/possession/${item.libelle}/update`} className="btn btn-warning me-2">Modifier</Link>
                      <Button type="button" variant="danger" onClick={() => closePossession(item.libelle)}>Clôturer</Button>
                      <Button variant="danger" onClick={() => deletePossession(item.libelle)} className="ms-2">Supprimer</Button>
                    </td>
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
          <h3>Total Patrimoine : {totalValeurActuelle.toFixed(2)} €</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default PossessionPage;
