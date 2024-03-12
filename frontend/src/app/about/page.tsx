"use client";
import React, { useEffect, useState } from "react";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import BackgroundHeader from "@/components/BackgroundHeader";
import AboutCard from "@/components/AboutCard";
import AboutCardR from "@/components/AboutCardR";
import AboutCardL from "@/components/AboutCardL";

export default function Impact() {
  const [images, setImages] = useState<BackgroundImage[]>([]);

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

  return (
    <main className={styles.page}>
      <div className={styles.backgroundImageContainer}>
        <BackgroundHeader
          backgroundImageURIs={images.map((image) => image.imageURI)}
          header=""
          title="About Us"
          description="4FLOT is committed in preventing and ending homelessness, hunger and disparity in underprivileged communities. "
        />
      </div>
      <div className={styles.cardsBackground}></div>
      <div className={styles.whiteCardsContainer}>
        <div className={styles.cards}>
          <AboutCard
            ourText="Our Mission"
            imageUrl="/about/icon1.png"
            buttonUrl="/mission"
            buttonText="Learn More"
            title="Why We Do It"
            description="Leading the way for generations to come! Together we can .... make a difference by paying it forward with Love, Compassion, and Community Outreach for all humanity."
          />
          <AboutCardR
            ourText="Our Team"
            imageUrl="/about/icon1.png"
            buttonUrl="/team"
            buttonText="Read More"
            title="Meet our Team"
            description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
          />
          <AboutCardL
            ourText="Contact Us"
            imageUrl="/about/icon2.png"
            buttonUrl="/contact"
            buttonText="Contact Us"
            title="Stay Connected"
            description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
          />
        </div>
      </div>
    </main>
  );
}
