"use client";
import React, { useState } from "react";
import "./imageCarousel.css";

const ImageCarousel = ({ images }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="image-carousel">
      <button className="prev-button" onClick={prevSlide}>
        &#9665;
      </button>
      <div className="carousel-image">
        <img src={images[activeIndex]} alt={`Image ${activeIndex}`} />
      </div>
      <button className="next-button" onClick={nextSlide}>
        &#9655;
      </button>
    </div>
  );
};

export default ImageCarousel;
