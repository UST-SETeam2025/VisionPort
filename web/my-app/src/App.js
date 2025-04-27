import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Home/Homepage';
import CreditsPage from './Credit/Credit';
import TestMusic from './Test/TestMusic';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/credit" element={<CreditsPage />} />
        <Route path="/test" element={<TestMusic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
