import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Home/Homepage';
import CreditsPage from './Credit/Credit';
import TestMusic from './Test/TestMusic';
import PrivacyPolicy from './PrivacyPolicy';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/credit" element={<CreditsPage />} />
        <Route path="/test" element={<TestMusic />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
