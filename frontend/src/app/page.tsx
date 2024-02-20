"use client";
import "./globals.css";


<<<<<<< HEAD
import { useEffect, useState } from "react";

import BackgroundHeader from "../components/BackgroundHeader";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
/*import WhiteCard from "./WhiteCard";*/
=======
import BackgroundHeader from "./BackgroundHeader";
>>>>>>> af50b9bff0eb2e3745c9a12e049ff98c4a7e9528

export default function Impact() {
  const [images, setImages] = useState<BackgroundImage[]>([])
  useEffect(() => {
    getBackgroundImages(BackgroundImagePages.HOME).then((result) => {
      if (result.success) {
        console.log(result.data, "images");
        setImages(result.data);
      }
    }).catch((error) => {
      alert(error);
    });
  }, []);

  
  return (
    <main style={{ backgroundColor: "#F9F9F9" }}>
<<<<<<< HEAD
      {images.length > 0 && (
      <BackgroundHeader 
      backgroundImageURIs={images.map((image) => image.imageURI)}
      header={"Our Impact"}
      title={"4 Future Leaders of Tomorrow"}
      description={"4FLOT is committed in preventing and ending homelessness, hunger and disparity inunderprivileged communities."}
       /> )}

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
=======
      <BackgroundHeader images={images} interval={1000} learnMoreFlag={true} />
>>>>>>> af50b9bff0eb2e3745c9a12e049ff98c4a7e9528
    </main>
  );
}
