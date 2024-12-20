import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css'; // Import file CSS
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import {useLocation, useNavigate} from 'react-router-dom';

const HomePage = () => {
  const location=useLocation()
  const navigate = useNavigate();

  const [comics, setComics] = useState([]); // Dữ liệu truyện tranh
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(500); // Giới hạn tổng số trang là 500

  useEffect(() => {
    const fetchComics = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=${page}`
        );
        setComics(response.data.data.items);
        setTotalPages(Math.min(response.data.data.totalPages || 500, 500)); // Giới hạn số trang tối đa là 500
      } catch (err) {
        console.error('Lỗi khi gọi API:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, [page]); // Mỗi khi trang thay đổi, gọi API lại

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleLogout = () => {
    navigate('/login', { state: { id: null } });
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Có lỗi xảy ra: {error}</div>;

  const pageNumbers = Array.from({ length: 5 }, (_, index) => page + index).filter(p => p <= totalPages);

  return (
    
    <div className="homepage-container">
                  <h1>Hello {location.state.id} and welcome to the home</h1>

            <button onClick={handleLogout}>Logout</button>

            <Link to="/recharge"> {/* Nút dẫn đến RechargePage */}
        <button className="recharge-button">Nạp Xu</button>
      </Link>
      <h1 className="homepage-title">Danh sách truyện tranh</h1>
      <div className="container">
        {comics.map((comic) => (
          <div key={comic._id} className="comic-item">
            <img
              src={`https://otruyenapi.com//uploads/comics/${comic.thumb_url}`}
              alt={comic.name}
            />
            <h3>{comic.name}</h3>
            <a href={`/comic/${comic.slug}`}>Xem chi tiết</a>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
        >
          &lt;&lt; Trang đầu
        </button>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Trang trước
        </button>
        {pageNumbers.map(num => (
          <button
            key={num}
            className={num === page ? 'active' : ''}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Trang sau
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
        >
          Trang cuối &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default HomePage