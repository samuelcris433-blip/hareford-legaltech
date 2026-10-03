import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProcessDetail from './pages/ProcessDetail';
import Home from './pages/Home';
import Radicacion from './pages/Radicacion';
import Calculadora from './pages/Calculadora';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProcessDetail />} />
        <Route path="/radicar" element={<Radicacion />} />
        <Route path="/calculadora" element={<Calculadora />} />
      </Routes>
    </Router>
  );
}

export default App;
