"use client";
import React, { useEffect, useState } from "react";

import EventsList from "../../../components/EventsList";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import BackgroundHeader from "@/components/BackgroundHeader";

export default function PastEvents() {
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
    <div className="items-center justify-center">
      <BackgroundHeader
        backgroundImageURIs={images.map((image) => image.imageURI)}
        header="GET INVOLVED"
        title="Past Events"
        description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
      />
      <div className={styles.body}>
        <div className={styles.bodyTitle}>
          <h1 style={{ font: "var(--font-title-l)" }}>Explore our Past Events</h1>
          <p style={{ font: "var(--font-body-reg)" }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque necessitatibus
            asperiores, optio quasi sit tempora in amet aut natus, similique enim explicabo id
            expedita minima doloribus repellendus est? Quos, officia?
          </p>
        </div>
        <EventsList page="past-events" />
      </div>
    </div>
  );
}
