import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ChapterImg.css";

const ChapterImg = () => {
  const { state } = useLocation();
  const [images, setImages] = useState([]);
  const [chapterName, setChapterName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapterImages = async () => {
      if (!state || !state.chapterApiUrl) {
        setError("Không có dữ liệu chương để hiển thị.");
        return;
      }

      try {
        const response = await axios.get(state.chapterApiUrl);
        const chapterData = response.data.data.item;

        setChapterName(chapterData.chapter_name);
        const chapterImages = chapterData.chapter_image.map((image) => ({
          imageUrl: `${response.data.data.domain_cdn}/${chapterData.chapter_path}/${image.image_file}`,
        }));

        setImages(chapterImages);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu chương:", err.message);
        setError(err.message);
      }
    };

    fetchChapterImages();
  }, [state]);

  if (error) {
    return <div>Có lỗi xảy ra: {error}</div>;
  }

  return (
    <div className="chapter-container">
      <h2 className="chapter-title">Chương {chapterName}</h2>
      <div className="chapter-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.imageUrl}
            alt={`Page ${index + 1}`}
            className="chapter-image"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default ChapterImg