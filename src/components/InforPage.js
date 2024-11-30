import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const InforPage = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const [comic, setComic] = useState(null); // Dữ liệu chi tiết của truyện
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [error, setError] = useState(null); // Trạng thái lỗi
  const removeHtmlTags = (htmlString) => {
    return htmlString.replace(/<[^>]*>?/gm, ""); // Loại bỏ các thẻ HTML
  };
  

  // Hàm gọi API chi tiết truyện
  useEffect(() => {
    const fetchComicDetail = async () => {
      try {
        const response = await axios.get(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setComic(response.data.data.item); // Lưu dữ liệu vào state
      } catch (err) {
        console.error("Lỗi khi gọi API:", err.message);
        setError(err.message); // Lưu thông báo lỗi
      } finally {
        setLoading(false); // Dừng trạng thái tải
      }
    };

    fetchComicDetail(); // Gọi hàm fetchComicDetail
  }, [slug]);

  // Xử lý khi đang tải
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  // Xử lý khi có lỗi
  if (error) {
    return <div>Có lỗi xảy ra: {error}</div>;
  }

  // Xử lý giao diện trang chi tiết
  return (
    <div style={{ padding: "20px" }}>
      <h1>{comic.name}</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Hình ảnh */}
        <div>
          <img
            src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
            alt={comic.name}
            style={{ width: "300px", height: "auto", borderRadius: "8px" }}
          />
        </div>

        {/* Thông tin chi tiết */}
        <div style={{ flex: 1 }}>
          <p>
            <strong>Tác giả:</strong>{" "}
            {comic.author && comic.author.join(", ")} {/* Nối tên tác giả */}
          </p>
          <p>
            <strong>Thể loại:</strong>{" "}
            {comic.category &&
              comic.category.map((cat) => cat.name).join(", ")}{" "}
            {/* Hiển thị danh sách thể loại */}
          </p>
          <p>
          <strong>Mô tả:</strong> {removeHtmlTags(comic.content)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InforPage