"use client";
import "./globals.css";
import { useEffect, useState } from "react";

import BackgroundHeader from "../components/BackgroundHeader";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import Button from "@/components/Button";
/*import WhiteCard from "./WhiteCard";*/

export default function Impact() {
  const [images, setImages] = useState<BackgroundImage[]>([]);
  useEffect(() => {
    getBackgroundImages(BackgroundImagePages.HOME)
      .then((result) => {
        if (result.success) {
          console.log(result.data, "images");
          setImages(result.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <main style={{ backgroundColor: "#F9F9F9" }}>
      {images.length > 0 && (
        <BackgroundHeader
          backgroundImageURIs={images.map((image) => image.imageURI)}
          header={""}
          title={"4 Future Leaders of Tomorrow"}
          description={
            "4FLOT is committed in preventing and ending homelessness, hunger and disparity in underprivileged communities."
          }
          button={<Button text="Learn More" link="/join-us" />}
        />
      )}
    </main>
  );
}
