import React, { useState } from "react";
import { SlideData } from "./SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function ImageSlider({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {SlideData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && <img
              src={slide.image}
              alt="Images of luxury items"
              className="image"
            />}
            
          </div>
        );
      })}
    </section>
  );
}

export default ImageSlider;
