"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

import NewsletterArchive from "../../components/NewsletterArchive";
import NewsletterCard from "../../components/NewsletterCard";
import NewsletterPopup from "../../components/NewsletterPopup";
import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import BackgroundHeader from "@/components/BackgroundHeader";
import Button from "@/components/Button";

const newsletter1 = {
  _id: "1",
  image: "/newsletter1.png",
  title: "Winter 2023: Title",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
  content: ["Content paragraph 1", "Content paragraph 2"],
};

const newsletter2 = {
  _id: "2",
  image: "/newsletter2.png",
  title: "Special Event Newsletter2",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
  content: ["Content paragraph 1", "Content paragraph 2"],
};

const newsletter3 = {
  _id: "3",
  image: "/newsletter2.png",
  title: "Special Event Newsletter3",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
  content: ["Content paragraph 1", "Content paragraph 2"],
};

const newsletter4 = {
  _id: "3",
  image: "/newsletter2.png",
  title: "Special Event Newsletter4",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
  content: ["Content paragraph 1", "Content paragraph 2"],
};

const newsletter5 = {
  _id: "2",
  image: "/newsletter2.png",
  title: "Special Event Newsletter",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
  content: ["Content paragraph 1", "Content paragraph 2"],
};

export default function Newsletter() {
  const [popupOpen, setPopup] = useState(false);
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

  const handleSubscribeClick = () => {
    setPopup(true);
  };

  return (
    <main>
      <BackgroundHeader
        backgroundImageURIs={images.map((image) => image.imageURI)}
        header="OUR IMPACT"
        title="Newsletter"
        description="4FLOT is committed in preventing and ending homelessness, hunger and disparity in underprivileged communities. "
      />
      <div className={styles.text}>
        <div className={styles.subtitle}>Quarterly Updates</div>
        <div className={styles.containerCardsAndText}>
          <div className={styles.description}>
            Description of general newsletter content, what to expect in the newsletters, etc.
          </div>
          <Button text="Subscribe for Updates" onClick={handleSubscribeClick} />
        </div>
        <NewsletterPopup open={popupOpen} setOpen={setPopup} />
      </div>

      <div className={styles.page}>
        <div className={styles.newslettersDisplay}>
          <NewsletterCard newsletter={newsletter1}></NewsletterCard>
          <NewsletterCard newsletter={newsletter2}></NewsletterCard>
        </div>
        <div className={styles.archiveContainer}>
          <div className={styles.titlelarge}>Archive</div>
          <NewsletterArchive year="2024" newsletters={[newsletter5]} />
          <NewsletterArchive
            year="2023"
            newsletters={[newsletter1, newsletter2, newsletter3, newsletter4]}
          />
        </div>
      </div>
    </main>
  );
}
