"use client";

import React from "react";

import BackgroundHeader from "./BackgroundHeader";

export default function Impact() {
  const images = [
    "/carousel-images/impact_bg.png",
    "/carousel-images/home.png",
    "/carousel-images/home2.jpeg",
    // Add more image paths as needed
  ];
  return (
    <main style={{ backgroundColor: "#F9F9F9" }}>
      <BackgroundHeader images={images} interval={1000} learnMoreFlag={true} />
    </main>
  );
}
