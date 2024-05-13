"use client";
import React, { useEffect, useState } from "react";

import { getPageText } from "../../../api/pageeditor";
import EventsList from "../../../components/EventsList";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import BackgroundHeader from "@/components/BackgroundHeader";

export default function UpcomingEvents() {
  const [images, setImages] = useState<BackgroundImage[]>([]);
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");

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
    getPageText("Upcoming Events")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
        } else {
          alert(response.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div className="items-center justify-center">
      <BackgroundHeader
        backgroundImageURIs={images.map((image) => image.imageURI)}
        header="GET INVOLVED"
        title="Upcoming Events"
        description={phSubtitle}
      />

      <div className={styles.body}>
        <div className={styles.bodyTitle}>
          <h1 style={{ font: "var(--font-title-l)" }}>{s1Subtitle}</h1>
          <p style={{ font: "var(--font-body-reg)" }}>{s1Text}</p>
        </div>
        <EventsList page="upcoming-events" />
      </div>
    </div>
  );
}
