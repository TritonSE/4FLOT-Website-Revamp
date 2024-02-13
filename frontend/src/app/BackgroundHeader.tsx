import Image from "next/image";
import React, { useState, useEffect } from "react";
import "./backgroundheader.css";

/*const styleObj = { color: "white" };*/

type bgProps = {
  images: string[];
};

const BackgroundHeader: React.FC<bgProps> = ({ images, interval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  useEffect(() => {
    const autoPlayInterval = setInterval(nextSlide, interval);
    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [interval]);
  return (
    <div className="background-container">
      {/*<Image
        src={images[0]}
        alt="Background image"
        layout="fill"
        objectFit="cover"
        className="background-image"
        priority
  />*/}
      <Image
        src={images[activeIndex]}
        alt={`Slide ${activeIndex}`}
        layout="fill"
        objectFit="cover"
        className="background-image"
        priority
      />
      <div className="carousel-container">
        <button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
          &lt;
        </button>
        <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
          &gt;
        </button>
      </div>
      <div
        className="bg-text-container" /*className="absolute bottom-20 left-20 w-1/2 h-full flex flex-col items-start justify-center ml-20"*/
      >
        <h1 className="bg-title" /*className="text-white text-4xl py-10 font-bold"*/>Our Impact</h1>
        <p className="bg-para" /*style={styleObj}*/>
          4FLOT is committed in preventing and ending homelessness, hunger and disparity in
          underprivileged communities.
        </p>
      </div>
    </div>
  );
};

export default BackgroundHeader;
