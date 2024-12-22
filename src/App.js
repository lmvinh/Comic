import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ComicDetail from './components/ComicDetail';
import InforPage from './components/InforPage';
import ChapterImg from './components/ChapterImg'; // Import thêm ChapterImg
import RechargePage from './components/RechargePage'; // Import RechargePage mới
import Login from "./components/Login"
import Signup from "./components/Signup"
import Payment1k from "./components/Payment1k"
import AddComic from './components/AddComic'; // Đảm bảo rằng đường dẫn đúng
import ComicList from './components/ComicList'; // Trang danh sách truyện mới

const App = () => {
  const [comics, setComics] = useState([]); // Danh sách truyện

  const addComic = (comic) => {
    // Lưu ảnh bìa vào folder hoặc server
    // Bạn có thể dùng FormData để upload file lên server hoặc xử lý ảnh bìa ở đây
    const newComic = { ...comic, coverUrl: URL.createObjectURL(comic.cover) };
    setComics([...comics, newComic]); // Thêm truyện vào danh sách
  };
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} /> {/* Route cho HomePage */}
        <Route path="/comic/:slug" element={<InforPage />} /> {/* Route cho thông tin truyện */}
        <Route path="/chapter/:chapterName" element={<ChapterImg />} /> {/* Route cho chương */}
        <Route path="/recharge" element={<RechargePage />} /> {/* Route cho trang nạp xu */}
        <Route path="/" element={<Login />} /> {/* Route cho trang nạp xu */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/payment" element={<Payment1k/>}/>
        <Route path="/add-comic" element={<AddComic addComic={addComic} />} /> {/* Trang đăng truyện */}
        <Route path="/comics" element={<ComicList comics={comics} />} /> {/* Trang danh sách truyện */}


      </Routes>
    </Router>
  );
};

export default App