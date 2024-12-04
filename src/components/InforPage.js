import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ChapterImg from "./ChapterImg";
import "./InforPage.css"; // Import file CSS

const InforPage = () => {
  const { slug } = useParams();
  const [comic, setComic] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm loại bỏ HTML tags từ chuỗi
  const removeHtmlTags = (htmlString) => {
    return htmlString.replace(/<[^>]*>?/gm, "");
  };

  // Fetch dữ liệu truyện tranh từ API
  useEffect(() => {
    const fetchComicDetail = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const comicData = response.data.data.item;

        // Ghi log dữ liệu trả về từ API
        console.log("Dữ liệu comic:", comicData);

        // Trích xuất tất cả các chương từ server_data
        const allChapters = comicData.chapters.flatMap((chapter) => chapter.server_data);
        console.log("Danh sách chapters:", allChapters);

        setComic(comicData);
        setChapters(allChapters); // Gán danh sách chương, hoặc mảng rỗng nếu không có
      } catch (err) {
        console.error("Lỗi khi gọi API:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComicDetail();
  }, [slug]);

  // Xử lý khi người dùng nhấp vào một chương
  const handleChapterClick = async (chapter) => {
    try {
      const response = await axios.get(chapter.chapter_api_data);
      console.log("Dữ liệu chương được chọn:", response.data.data); // Ghi log dữ liệu của chương
      setSelectedChapter(response.data.data);
    } catch (err) {
      console.error("Lỗi khi tải chương:", err.message);
      setError(err.message);
    }
  };

  // Xử lý trạng thái khi đang tải
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  // Xử lý khi có lỗi xảy ra
  if (error) {
    return <div>Có lỗi xảy ra: {error}</div>;
  }

  return (
    <div className="infor-container">
      {/* Header */}
      <h1 className="infor-header">{comic.name}</h1>

      {/* Chi tiết thông tin truyện */}
      <div className="infor-details">
        <div>
          <img
            src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
            alt={comic.name}
            className="infor-image"
          />
        </div>
        <div className="infor-author-category">
          <p>
            <strong>Tác giả:</strong> {comic.author && comic.author.join(", ")}
          </p>
          <p>
            <strong>Thể loại:</strong>{" "}
            {comic.category &&
              comic.category.map((cat) => cat.name).join(", ")}
          </p>
          <p>
            <strong>Mô tả:</strong> {removeHtmlTags(comic.content)}
          </p>
        </div>
      </div>

      {/* Danh sách chương */}
      <div className="infor-chapters">
        <h2>Danh sách chương</h2>
        <ul className="infor-chapter-list">
          {chapters.length > 0 ? (
            chapters.map((chapter, index) => (
              <li key={index} className="infor-chapter-item">
                <button
                  onClick={() => handleChapterClick(chapter)}
                  className="infor-chapter-button"
                >
                  Chương {chapter.chapter_name}
                </button>
              </li>
            ))
          ) : (
            <p>Không có chương nào để hiển thị.</p>
          )}
        </ul>
      </div>

      {/* Hiển thị nội dung của chương đã chọn */}
      {selectedChapter && (
        <ChapterImg
          images={selectedChapter.images}
          chapterName={selectedChapter.chapter_name}
        />
      )}
    </div>
  );
};

export default InforPage;