import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ComicDetail from './components/ComicDetail';
import InforPage from './components/InforPage';
import ChapterImg from './components/ChapterImg'; // Import thêm ChapterImg

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Route cho HomePage */}
        <Route path="/comic/:slug" element={<InforPage />} /> {/* Route cho thông tin truyện */}
        <Route path="/chapter/:chapterName" element={<ChapterImg />} /> {/* Route cho chương */}
      </Routes>
    </Router>
  );
};

export default App