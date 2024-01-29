import Image from "next/image";
import React from "react";
import "./backgroundheader.css";

/*const styleObj = { color: "white" };*/

const BackgroundHeader = () => {
  return (
    <div className="background-container">
      <Image
        src="/impact_bg.png"
        alt="Background image"
        layout="fill"
        objectFit="cover"
        className="background-image"
        priority
      />

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
