import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ChartPage.css'; // Importation du fichier CSS

function ChartPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [chartData, setChartData] = useState({});
  const [step, setStep] = useState(1); // Étape du processus

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSelectedDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleValidateStartEndDates = () => {
    if (startDate && endDate && startDate <= endDate) {
      setStep(2); // Passer à l'étape suivante
    } else {
      alert('Veuillez sélectionner des dates valides.');
    }
  };

  const handleValidateSelectedDate = () => {
    if (selectedDate && startDate && endDate && selectedDate >= startDate && selectedDate <= endDate) {
      updateChartData();
    } else {
      alert('Veuillez sélectionner une date valide.');
    }
  };

  const updateChartData = () => {
    // Exemple de données pour le graphique
    const labels = ['Date 1', 'Date 2', 'Date 3']; // Remplacez par des labels dynamiques
    const values = [10, 20, 30]; // Remplacez par des valeurs dynamiques

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Valeur des Possessions',
          data: values,
          backgroundColor: 'rgb(75, 192, 192)', // Couleur verte
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 2,
          fill: false, // Ne pas remplir sous la ligne
        },
      ],
    };

    setChartData(data);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Graphique des Possessions</h2>

      <div className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Date de Début :</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy/MM/dd"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Date de Fin :</label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy/MM/dd"
                className="form-control"
              />
            </div>
          </div>
        </div>
        {step === 1 && (
          <button className="btn btn-primary mt-3" onClick={handleValidateStartEndDates}>
            Valider Dates Début/Fin
          </button>
        )}
      </div>

      {step === 2 && (
        <div className="mb-4">
          <div className="form-group">
            <label>Date Sélectionnée :</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleSelectedDateChange}
              minDate={startDate}
              maxDate={endDate}
              dateFormat="yyyy/MM/dd"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={handleValidateSelectedDate}>
            Valider Date Sélectionnée
          </button>
        </div>
      )}

      {chartData.labels && (
        <div className="chart-container">
          <Line
            data={chartData}
            options={{
              indexAxis: 'y', // Affichage horizontal
              scales: {
                x: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ChartPage;
