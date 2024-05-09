"use client";
import React, { useEffect, useState } from "react";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import BackgroundHeader from "@/components/BackgroundHeader";
import WhiteCard from "@/components/WhiteCard";

export default function Involved() {
  const [images, setImages] = useState<BackgroundImage[]>([]);
  // const [phSubtitle, setPhSubtitle] = useState<string>("");
  // const [s1Title, setS1Title] = useState<string>("");
  // const [s2Title, setS2Title] = useState<string>("");

  useEffect(() => {
    getBackgroundImages(BackgroundImagePages.TEAM)
      .then((result) => {
        if (result.success) {
          setImages(result.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  // let pageText;
  // useEffect(() => {
  //   getPageText("Get Involved")
  //     .then((response) => {
  //       if (response.success) {
  //         pageText = response.data;
  //         setPhSubtitle(pageText.ph_subtitle);
  //         setS1Subtitle(pageText.s1_title);
  //         setS1Text(pageText.s1_text);
  //       } else {
  //         alert(response.error);
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // }, []);

  return (
    <main className={styles.page}>
      <div className={styles.backgroundImageContainer}>
        <BackgroundHeader
          backgroundImageURIs={images.map((image) => image.imageURI)}
          header=""
          title="Get Involved"
          description="4FLOT is committed in preventing and ending homelessness, hunger and disparity in underprivileged communities. "
        />
      </div>
      <div className={styles.cardsBackground}></div>
      <div className={styles.whiteCardsContainer}>
        <div className={styles.cards}>
          <WhiteCard
            imageUrl="/cal.svg"
            buttonUrl="/events"
            buttonText="Learn More"
            title="Upcoming Events"
            description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
          />
          <WhiteCard
            imageUrl="/group.svg"
            buttonUrl="/donate"
            buttonText="Learn More"
            title="Donate"
            description="Your support and contributions will enable us to meet our goals and improve conditions. Your generous donation will fund our mission."
          />
        </div>
      </div>
    </main>
  );
}
