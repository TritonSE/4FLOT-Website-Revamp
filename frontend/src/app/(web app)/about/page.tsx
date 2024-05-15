"use client";
import React, { useEffect, useState } from "react";

import { getPageText } from "../../../api/pageeditor";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import AboutCard from "@/components/AboutCard";
import BackgroundHeader from "@/components/BackgroundHeader";

export default function Impact() {
  const [images, setImages] = useState<BackgroundImage[]>([]);
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");
  const [s2Subtitle, setS2Subtitle] = useState<string>("");
  const [s2Text, setS2Text] = useState<string>("");
  const [s3Subtitle, setS3Subtitle] = useState<string>("");
  const [s3Text, setS3Text] = useState<string>("");

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
    getPageText("About Us")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
          setS2Subtitle(pageText.pageSections[2].sectionTitle ?? "");
          setS2Text(pageText.pageSections[2].sectionSubtitle ?? "");
          setS3Subtitle(pageText.pageSections[3].sectionTitle ?? "");
          setS3Text(pageText.pageSections[3].sectionSubtitle ?? "");
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
          title="About Us"
          description={phSubtitle}
        />
      </div>
      <div className={styles.cards}>
        <AboutCard
          ourText="Our Mission"
          imageUrl="/missionimg.png"
          buttonUrl="/mission"
          buttonText="Learn More"
          title={s1Subtitle}
          description={s1Text}
          contentSide="right"
        />
        <AboutCard
          ourText="Our Team"
          imageUrl="/ourteamimg.png"
          buttonUrl="/team"
          buttonText="Read More"
          title={s2Subtitle}
          description={s2Text}
          contentSide="left"
        />
        <AboutCard
          ourText="Contact Us"
          imageUrl="/contactusimg.png"
          buttonUrl="/contact"
          buttonText="Contact Us"
          title={s3Subtitle}
          description={s3Text}
          contentSide="right"
        />
      </div>
    </main>
  );
}
