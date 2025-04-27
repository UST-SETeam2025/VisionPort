import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Home/Homepage';
import CreditsPage from './Credit/Credit';
import TestMusic from './Test/TestMusic';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/credit" element={<CreditsPage />} />
        <Route path="/test" element={<TestMusic />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
