import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [comics, setComics] = useState([]); // Dữ liệu truyện tranh
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Hàm gọi API
  useEffect(() => {
    const fetchComics = async () => {
      try {
        // Gọi API từ oTruyen
        const response = await axios.get('https://otruyenapi.com/v1/api/home', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // Lưu dữ liệu API vào state
        setComics(response.data.data.items); 
      } catch (err) {
        console.error('Lỗi khi gọi API:', err.message);
        setError(err.message); // Lưu thông báo lỗi
      } finally {
        setLoading(false); // Dừng trạng thái tải
      }
    };

    fetchComics(); // Gọi hàm khi component được render
  }, []);

  // Xử lý khi đang tải
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  // Xử lý khi có lỗi
  if (error) {
    return <div>Có lỗi xảy ra: {error}</div>;
  }

  // Giao diện chính khi hiển thị danh sách truyện
  return (
    <div>
      <h1>Danh sách truyện tranh</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {comics.map((comic) => (
          <div
            key={comic._id}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              width: '250px',
              borderRadius: '8px',
            }}
          >
            <img
              src={`https://otruyenapi.com//uploads/comics/${comic.thumb_url}`} // Thêm đường dẫn đầy đủ cho ảnh
              alt={comic.name}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <h3 style={{ fontSize: '18px', marginTop: '10px' }}>{comic.name}</h3>
            <a href={`/comic/${comic.slug}`} style={{ color: 'blue', textDecoration: 'underline' }}>
              Xem chi tiết
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage
