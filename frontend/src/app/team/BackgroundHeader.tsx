import Image from "next/image";
import React from "react";

const BackgroundHeader = () => {
  return (
    <div className="w-full h-screen relative">
      <Image
        src="/image 18.png"
        alt="Background image"
        layout="fill"
        objectFit="cover"
        className="object-cover"
        priority
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-1/2 h-full flex flex-col items-start justify-center ml-20">
        <h2>ABOUT US</h2>
        <h1 className="text-white text-4xl py-10 font-bold">Meet Our Team</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit
          sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.
        </p>
      </div>
    </div>
  );
};

export default BackgroundHeader;
