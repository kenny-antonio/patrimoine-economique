// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import PossessionPage from './pages/PossessionPage';
import CreatePossessionPage from './pages/CreatePossessionPage';
import UpdatePossessionPage from './pages/UpdatePossessionPage';
import ChartPage from './pages/ChartPage';

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<PossessionPage />} />
        <Route path="/possession/create" element={<CreatePossessionPage />} />
        <Route path="/possession/:libelle/update" element={<UpdatePossessionPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
