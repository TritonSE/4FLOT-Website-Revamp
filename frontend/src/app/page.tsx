import "./globals.css";
"use client";

import React from "react";

import BackgroundHeader from "./BackgroundHeader";
/*import WhiteCard from "./WhiteCard";*/

export default function Impact() {
  const images = [
    "/carousel-images/impact_bg.png",
    "/carousel-images/home.png",
    "/carousel-images/home2.jpeg",
    // Add more image paths as needed
  ];
  return (
    <main style={{ backgroundColor: "#F9F9F9" }}>
      <BackgroundHeader images={images} />
      {/* White Cards 
      <WhiteCard
        imageUrl="/testimonials.png"
        title="Testimonals"
        description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
        verticalPosition="38.68vw"
      />
      <WhiteCard
        imageUrl="/Newsletter.png"
        title="Newsletter"
        description="Your support and contributions will enable us to meet our goals and improve conditions. Your generous donation will fund our mission."
        verticalPosition="71.04vw"
  />*/}
    </main>
  );
}
