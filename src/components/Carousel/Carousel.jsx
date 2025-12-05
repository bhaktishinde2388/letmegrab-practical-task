import { useState, useEffect } from "react";
import "./Carousel.css";

function Carousel({ images = [], interval = 3000 }) {
  const [img, setImg] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const id = setInterval(() => {
      setImg((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(id);
  }, [images, interval]);

  if (images.length === 0) return null;

  return (
    <div className="carousel-container">
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${img * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="carousel-slide">
            <img src={img} alt={`slide-${i}`} />
          </div>
        ))}
      </div>

      <button
        className="carousel-arrow left"
        onClick={() =>
          setImg(img === 0 ? images.length - 1 : img - 1)
        }
      >
        &#10094;
      </button>
      <button
        className="carousel-arrow right"
        onClick={() => setImg((img + 1) % images.length)}
      >
        &#10095;
      </button>

      <div className="carousel-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === img ? "active" : ""}`}
            onClick={() => setImg(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
