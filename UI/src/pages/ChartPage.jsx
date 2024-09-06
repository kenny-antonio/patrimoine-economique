import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';
import './ChartPage.css';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip);

const staticPossessions = [
  { libelle: "MacBook Pro", valeur: 4300000, dateDebut: "2023-12-25T00:00:00.000Z" },
  { libelle: "Compte épargne", valeur: 500000, dateDebut: "2019-01-06T00:00:00.000Z" },
  { libelle: "Clothes", valeur: 2000000, dateDebut: "2020-01-01T00:00:00.000Z" },
  { libelle: "Alternance", valeur: 600000, dateDebut: "2023-02-13T00:00:00.000Z" },
  { libelle: "Survie", valeur: 300000, dateDebut: "2023-02-13T00:00:00.000Z" },
  { libelle: "Redmi Note 9", valeur: 800000, dateDebut: "2022-12-29T00:00:00.000Z" }
];

const ChartPage = () => {
  const [startDate, setStartDate] = useState(new Date('2019-01-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const filterData = () => {
    const filteredData = staticPossessions.filter(possession => {
      const dateDebut = new Date(possession.dateDebut);
      return dateDebut >= startDate && dateDebut <= endDate;
    });

    const labels = filteredData.map(possession => new Date(possession.dateDebut).toISOString().split('T')[0]);
    const values = filteredData.map(possession => possession.valeur);

    return { labels, values };
  };

  const { labels, values } = filterData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Valeur du patrimoine',
        data: values,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permet de contrôler les dimensions via CSS
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw.toFixed(2)} €`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Valeur (€)'
        }
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <h2>PATRIMOINE ECONOMIQUE</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={20}>
          <Form>
            <Form.Group>
              <Form.Label>Date de début</Form.Label>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date de fin</Form.Label>
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Jour</Form.Label>
              <DatePicker selected={selectedDay} onChange={(date) => setSelectedDay(date)} />
            </Form.Group>
            <Button variant="primary" onClick={() => filterData()}>Valider</Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md={12} className="chart-container">
          <Chart type='line' data={data} options={options} />
        </Col>
      </Row>
    </Container>
  );
};

export default ChartPage;
