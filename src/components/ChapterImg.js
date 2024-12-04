import React from "react";
import "./ChapterImg.css"; // Import file CSS

const ChapterImg = ({ images, chapterName }) => {
  return (
    <div className="chapter-container">
      <h2 className="chapter-title">Chương {chapterName}</h2>
      <div className="chapter-images">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Page ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ChapterImg;
