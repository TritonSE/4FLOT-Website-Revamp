"use client";
import React, { useEffect, useState } from "react";

import "./globals.css";
import Link from "next/link";

import BackgroundHeader from "../components/BackgroundHeader";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import Button from "@/components/Button";
import Description from "@/components/Description";
import EventsList from "@/components/EventsList";
import WhiteCard from "@/components/WhiteCard";

export default function Home() {
  const [images, setImages] = useState<BackgroundImage[]>([]);

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

  return (
    <main className={styles.page}>
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
      <div className={styles.whiteCardsContainer}>
        <WhiteCard
          imageUrl="/Donate.svg"
          buttonUrl="/"
          buttonText="Donate"
          title="Help Our Cause"
          description="Your support and contributions will enable us to meet our goals and improve conditions. 
            Your generous donation will fund our mission."
        />
      </div>
      <div className={styles.container}>
        <Description
          title="Get Involved at our Upcoming Events"
          description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
        />
        <div className={styles.eventsListContainer}>
          <EventsList page="home" />
        </div>
        <div className={styles.buttonContainer}>
          <Link href="/events" className={styles.buttonText}>
            {see_more_text}
          </Link>
        </div>
        <Description
          title="Our Community Sponsors"
          description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
        />
        <img className={styles.sponsor_image} src="/Sponsors.svg" alt="Sponsors" />
        <div className={styles.buttonContainer}>
          <Link href="/contact" className={styles.buttonText}>
            {sponsor_us_text}
          </Link>
        </div>
      </div>
    </main>
  );
}

/*
import { useEffect, useState } from "react";

import BackgroundHeader from "../components/BackgroundHeader";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import Button from "@/components/Button";

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
*/
