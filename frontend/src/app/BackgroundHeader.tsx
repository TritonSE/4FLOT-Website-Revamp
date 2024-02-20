import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./backgroundheader.css";

/*const styleObj = { color: "white" };*/

const generateEllipses = (numImgs: number, activeIndex: number) => {
  const ellipses: JSX.Element[] = [];
  for (let i = 0; i < numImgs; i++) {
    const isActive = i === activeIndex;
    ellipses.push(
      <svg
        key={i}
        width="0.8333vw" /*12, 1440*/
        height="0.8333vw" /*12, 1440*/
        viewBox="0 0 0.8333vw 0.8333vw"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6" cy="6" r="6" fill={isActive ? "white" : "gray"} />
      </svg>,
    );
  }
  return ellipses;
};

const generateLearnMore = (learnFlag: boolean) => {
  const learnbutton: JSX.Element[] = [];
  if (learnFlag) {
    learnbutton.push(
      <div className="learn-more-container">
        <button className="learn-more-button">Learn More</button>
      </div>,
    );
  }
  return learnbutton;
};

type bgProps = {
  images: string[];
  interval: number;
  learnMoreFlag: boolean;
};

const BackgroundHeader: React.FC<bgProps> = ({ images, interval = 3000, learnMoreFlag }) => {
  const numImgs = images.length;

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.6667vw"
            height="1.6667vw"
            viewBox="0 0 1.6667vw 1.6667vw"
            fill="none"
          >
            <path
              d="M15.7 21.575L7.275 13.175C7.175 13.075 7.10433 12.9667 7.063 12.85C7.021 12.7333 7 12.6083 7 12.475C7 12.3417 7.021 12.2167 7.063 12.1C7.10433 11.9833 7.175 11.875 7.275 11.775L15.7 3.35C15.9333 3.11667 16.225 3 16.575 3C16.925 3 17.225 3.125 17.475 3.375C17.725 3.625 17.85 3.91667 17.85 4.25C17.85 4.58333 17.725 4.875 17.475 5.125L10.125 12.475L17.475 19.825C17.7083 20.0583 17.825 20.3457 17.825 20.687C17.825 21.029 17.7 21.325 17.45 21.575C17.2 21.825 16.9083 21.95 16.575 21.95C16.2417 21.95 15.95 21.825 15.7 21.575Z"
              fill="white"
            />
          </svg>
        </button>
        {generateEllipses(numImgs, activeIndex)}
        <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.6667vw"
            height="1.6667vw"
            viewBox="0 0 1.6667vw 1.6667vw"
            fill="none"
          >
            <path
              d="M9.025 2.37422L16.7479 10.7742C16.8396 10.8742 16.9044 10.9826 16.9423 11.0992C16.9808 11.2159 17 11.3409 17 11.4742C17 11.6076 16.9808 11.7326 16.9423 11.8492C16.9044 11.9659 16.8396 12.0742 16.7479 12.1742L9.025 20.5992C8.81111 20.8326 8.54375 20.9492 8.22292 20.9492C7.90208 20.9492 7.62708 20.8242 7.39792 20.5742C7.16875 20.3242 7.05417 20.0326 7.05417 19.6992C7.05417 19.3659 7.16875 19.0742 7.39792 18.8242L14.1354 11.4742L7.39792 4.12422C7.18403 3.89088 7.07708 3.60355 7.07708 3.26222C7.07708 2.92022 7.19167 2.62422 7.42083 2.37422C7.65 2.12422 7.91736 1.99922 8.22292 1.99922C8.52847 1.99922 8.79583 2.12422 9.025 2.37422Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className="bg-text-container">
        <h1 className="bg-title">Our Impact</h1>
        <p className="bg-para">
          4FLOT is committed in preventing and ending homelessness, hunger and disparity in
          underprivileged communities.
        </p>
      </div>
      {generateLearnMore(learnMoreFlag)}
    </div>
  );
};

export default BackgroundHeader;
