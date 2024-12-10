import React, { useEffect, useState } from "react"; // Import useState, useEffect từ React
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation và useNavigate từ react-router-dom
import axios from "axios"; // Import axios
import "./ChapterImg.css"; // Import file CSS

const ChapterImg = () => {
  const { state } = useLocation(); // Lấy state từ useLocation
  const navigate = useNavigate(); // Khai báo navigate để chuyển hướng
  const [images, setImages] = useState([]); // Khai báo state images
  const [chapterName, setChapterName] = useState(""); // Khai báo state chapterName
  const [error, setError] = useState(null); // Khai báo state error

  useEffect(() => {
    const fetchChapterImages = async () => {
      if (!state || !state.chapterApiUrl) {
        setError("Không có dữ liệu chương để hiển thị.");
        return;
      }

      try {
        const response = await axios.get(state.chapterApiUrl);
        const chapterData = response.data.data.item;

        setChapterName(chapterData.chapter_name); // Lưu tên chương
        const chapterImages = chapterData.chapter_image.map((image) => ({
          imageUrl: `${response.data.data.domain_cdn}/${chapterData.chapter_path}/${image.image_file}`,
        }));

        setImages(chapterImages); // Cập nhật danh sách hình ảnh
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu chương:", err.message);
        setError(err.message); // Xử lý lỗi
      }
    };

    fetchChapterImages(); // Gọi hàm fetch dữ liệu khi component mount

    // Cuộn lên đầu trang mỗi khi chuyển sang chapter mới
    window.scrollTo(0, 0);
  }, [state]); // Chạy lại khi state thay đổi

  const handlePreviousChapter = () => {
    if (state && state.chapters && state.currentChapterIndex > 0) {
      const prevChapter = state.chapters[state.currentChapterIndex - 1];
      navigate(`/chapter/${prevChapter.chapter_name}`, {
        state: {
          chapters: state.chapters,
          currentChapterIndex: state.currentChapterIndex - 1,
          chapterApiUrl: prevChapter.chapter_api_data, // Cập nhật URL của chương trước
        },
      });
    }
  };

  const handleNextChapter = () => {
    if (state && state.chapters && state.currentChapterIndex < state.chapters.length - 1) {
      const nextChapter = state.chapters[state.currentChapterIndex + 1];
      navigate(`/chapter/${nextChapter.chapter_name}`, {
        state: {
          chapters: state.chapters,
          currentChapterIndex: state.currentChapterIndex + 1,
          chapterApiUrl: nextChapter.chapter_api_data, // Cập nhật URL của chương sau
        },
      });
    }
  };

  if (error) {
    return <div>Có lỗi xảy ra: {error}</div>;
  }

  return (
    <div className="chapter-container">
      <h2 className="chapter-title">Chương {chapterName}</h2>
      <div className="chapter-images">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image.imageUrl}
              alt={`Page ${index + 1}`}
              className="chapter-image"
              loading="lazy"
            />
          ))
        ) : (
          <div>Không có hình ảnh để hiển thị.</div>
        )}
      </div>

      <div className="chapter-navigation">
        <button
          onClick={handlePreviousChapter}
          disabled={state && (!state.chapters || state.currentChapterIndex === 0)}
          className="navigation-button"
        >
          Chương trước
        </button>
        <button
          onClick={handleNextChapter}
          disabled={state && (!state.chapters || state.currentChapterIndex === state.chapters.length - 1)}
          className="navigation-button"
        >
          Chương sau
        </button>
      </div>
    </div>
  );
};

export default ChapterImg