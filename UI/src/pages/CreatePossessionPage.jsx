import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function CreatePossessionPage() {
  const [possesseur, setPossesseur] = useState('');
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState(new Date());
  const [tauxAmortissement, setTauxAmortissement] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPossession = {
      possesseur,
      libelle,
      valeur: parseFloat(valeur),
      dateDebut,
      tauxAmortissement: parseFloat(tauxAmortissement),
    };

    fetch('http://localhost:5000/possession/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPossession),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(() => {
        // Rediriger vers la page des possessions après l'ajout
        navigate('/');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de la possession:', error);
        setError('Impossible d\'ajouter la possession.');
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <h2>Ajouter une nouvelle possession</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Possesseur</Form.Label>
              <Form.Control
                type="text"
                value={possesseur}
                onChange={(e) => setPossesseur(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Libellé</Form.Label>
              <Form.Control
                type="text"
                value={libelle}
                onChange={(e) => setLibelle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valeur</Form.Label>
              <Form.Control
                type="number"
                value={valeur}
                onChange={(e) => setValeur(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date de début</Form.Label>
              <Form.Control
                type="date"
                value={dateDebut.toISOString().substr(0, 10)}
                onChange={(e) => setDateDebut(new Date(e.target.value))}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Taux d'Amortissement (%)</Form.Label>
              <Form.Control
                type="number"
                value={tauxAmortissement}
                onChange={(e) => setTauxAmortissement(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Ajouter</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePossessionPage;
