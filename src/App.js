import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ComicDetail from './components/ComicDetail';
import InforPage from './components/InforPage';
import ChapterImg from './components/ChapterImg'; // Import thêm ChapterImg
import RechargePage from './components/RechargePage'; // Import RechargePage mới
import Login from "./components/Login"
import Signup from "./components/Signup"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Route cho HomePage */}
        <Route path="/comic/:slug" element={<InforPage />} /> {/* Route cho thông tin truyện */}
        <Route path="/chapter/:chapterName" element={<ChapterImg />} /> {/* Route cho chương */}
        <Route path="/recharge" element={<RechargePage />} /> {/* Route cho trang nạp xu */}
        <Route path="/login" element={<Login />} /> {/* Route cho trang nạp xu */}
        <Route path="/signup" element={<Signup/>}/>

      </Routes>
    </Router>
  );
};

export default App