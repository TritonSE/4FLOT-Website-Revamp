"use client";
import React, { useEffect, useState } from "react";

import "../globals.css";
import { getPageText } from "../../api/pageeditor";
import BackgroundHeader from "../../components/BackgroundHeader";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import Button from "@/components/Button";
import Description from "@/components/Description";
import EventsList from "@/components/EventsList";
import WhiteCard from "@/components/WhiteCard";

export default function Home() {
  const [images, setImages] = useState<BackgroundImage[]>([]);
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");
  const [s2Subtitle, setS2Subtitle] = useState<string>("");
  const [s2Text, setS2Text] = useState<string>("");

  const see_more_text = "See More";
  const sponsor_us_text = "Sponsor Us";

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

  /* Get page data from MongoDB */
  let pageText;
  useEffect(() => {
    getPageText("Home")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
          setS2Subtitle(pageText.pageSections[2].sectionTitle ?? "");
          setS2Text(pageText.pageSections[2].sectionSubtitle ?? "");
          console.log("response.data: ", response.data);
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
      {images.length > 0 && (
        <BackgroundHeader
          backgroundImageURIs={images.map((image) => image.imageURI)}
          header={""}
          title={"4 Future Leaders of Tomorrow"}
          description={phSubtitle}
          button={<Button text="Learn More" link="/about" />}
        />
      )}
      <div className={styles.whiteCardsContainer}>
        <WhiteCard
          imageUrl="/Donate.svg"
          buttonUrl="/donations"
          buttonText="Donate"
          title="Help Our Cause"
          description="Your support and contributions will enable us to meet our goals and improve conditions. 
            Your generous donation will fund our mission."
        />
      </div>
      <div className={styles.container}>
        <Description title={s1Subtitle} description={s1Text} />
        <div className={styles.eventsListContainer}>
          <EventsList page="home" />
        </div>

        <div className={styles.buttonContainer}>
          <Button text={see_more_text} link={"/upcoming-events"} />
        </div>
        <Description title={s2Subtitle} description={s2Text} />
        <img className={styles.sponsor_image} src="/Sponsors.svg" alt="Sponsors" />
        <div className={styles.buttonContainer}>
          <Button text={sponsor_us_text} link={"/contact"} />
        </div>
      </div>
    </main>
  );
}
