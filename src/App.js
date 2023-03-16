import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';

import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Karla'],
      },
    });
  }, []);

  return (
    // <HomePage />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details/:characterId" element={<DetailsPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
