import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatrimoinePage from './pages/PatrimoinePage';
import CreatePossessionPage from './pages/CreatePossessionPage';
import PossessionPage from './pages/PossessionPage';
import UpdatePossessionPage from './pages/UpdatePossessionPage';
import ChartPage from './pages/ChartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PossessionPage />} />
        <Route path="/possession/create" element={<CreatePossessionPage />} />
        <Route path="/possession/:libelle/update" element={<UpdatePossessionPage />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/patrimoine" element={<PatrimoinePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
