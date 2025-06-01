import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AdViewerPage from './pages/AdViewerPage.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ad-view/:section/:adId" element={<AdViewerPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
