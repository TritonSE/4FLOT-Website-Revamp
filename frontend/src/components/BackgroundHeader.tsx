"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

type BackgroundHeaderProps = {
  backgroundImageURIs: string[];
  header: string;
  title: string;
  description: string;
  interval?: number;
  button?: React.ReactNode;
};



const BackgroundHeader = ({
  backgroundImageURIs,
  header,
  title,
  description,
  interval = 3000,
  button = null,
}: BackgroundHeaderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === backgroundImageURIs.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? backgroundImageURIs.length - 1 : prevIndex - 1));
  };

  const jumpToSlide = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const autoPlayInterval = setInterval(nextSlide, interval);
    return () => { clearInterval(autoPlayInterval); };
  }, [backgroundImageURIs.length, interval]);

  return (
    <div className="w-full h-screen relative">
      <Image
        src={backgroundImageURIs[activeIndex]}
        alt="Background image"
        layout="fill"
        objectFit="cover"
        className="object-cover"
        priority
      />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
      <div className="flex justify-center items-center space-x-2 absolute bottom-5 left-1/2 transform -translate-x-1/2">
        <button onClick={prevSlide} className="text-white p-2">
          &#10094; {/* Left Arrow Unicode */}
        </button>
        {backgroundImageURIs.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${activeIndex === index ? 'bg-white' : 'bg-gray-400'}`}
            onClick={() => { jumpToSlide(index); }}
          />
        ))}
        <button onClick={nextSlide} className="text-white p-2">
          &#10095; {/* Right Arrow Unicode */}
        </button>
      </div>
      <div className="absolute bottom-20 left-20 w-1/2 h-full flex flex-col items-start justify-center ml-20">
        <h2>{header}</h2>
        <h1 style={{ fontSize: '48px', lineHeight: '72px', fontWeight: 700, color: 'white' }}>
  {title}
</h1>
<p style={{ fontFamily: 'var(--font-body)', color: 'white', fontSize: '20px', lineHeight: '24px', fontWeight: 300 }}>
  {description}
</p>
        {button && <div className={"mt-6"}>{button}</div>}
      </div>
    </div>
  );
};

export default BackgroundHeader;