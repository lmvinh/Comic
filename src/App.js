import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';  // Import đúng tệp HomePage
import ComicDetail from './components/ComicDetail';
import InforPage from './components/InforPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Sử dụng HomePage cho route '/' */}
        <Route path="/comic/:slug" element={<InforPage />} />
      </Routes>
    </Router>
  );
};

export default App