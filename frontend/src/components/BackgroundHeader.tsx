import Image from "next/image";
import React from "react";

type BackgroundHeaderProps = {
  backgroundImage: string;
  header: string;
  title: string;
  description: string;
};

const BackgroundHeader = ({
  backgroundImage,
  header,
  title,
  description,
}: BackgroundHeaderProps) => {
  return (
    <div className="w-full h-screen relative">
      <Image
        src={backgroundImage}
        alt="Background image"
        layout="fill"
        objectFit="cover"
        className="object-cover"
        priority
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-1/2 h-full flex flex-col items-start justify-center ml-20">
        <h2>{header}</h2>
        <h1 className="text-white text-4xl py-10 font-bold">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default BackgroundHeader;
