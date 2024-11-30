import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    axios.get('API_URL')  // Thay thế bằng URL API thật của bạn
      .then(response => {
        setComics(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Danh sách truyện tranh</h1>
      <div>
        {comics.map(comic => (
          <div key={comic.id}>
            <h2>{comic.title}</h2>
            <Link to={`/comic/${comic.id}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
