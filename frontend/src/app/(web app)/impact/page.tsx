"use client";
import React, { useEffect, useState } from "react";

import { getPageText } from "../../../api/pageeditor";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import BackgroundHeader from "@/components/BackgroundHeader";
import WhiteCard from "@/components/WhiteCard";

export default function Impact() {
  const [images, setImages] = useState<BackgroundImage[]>([]);

  //admin variables
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");
  const [s2Subtitle, setS2Subtitle] = useState<string>("");

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

  let pageText;
  useEffect(() => {
    getPageText("Our Impact")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS2Subtitle(pageText.pageSections[2].sectionTitle ?? "");
        } else {
          alert(response.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.backgroundImageContainer}>
        <BackgroundHeader
          backgroundImageURIs={images.map((image) => image.imageURI)}
          header=""
          title="Our Impact"
          description={phSubtitle}
        />
      </div>
      <div className={styles.cardsBackground}></div>
      <div className={styles.whiteCardsContainer}>
        <div className={styles.cards}>
          <WhiteCard
            imageUrl="/testimonials.svg"
            buttonUrl="/testimonials"
            buttonText="Learn More"
            title="Testimonals"
            description={s1Subtitle}
          />
          <WhiteCard
            imageUrl="/newsletter.svg"
            buttonUrl="/newsletter"
            buttonText="Learn More"
            title="Newsletter"
            description={s2Subtitle}
          />
        </div>
      </div>
    </main>
  );
}
