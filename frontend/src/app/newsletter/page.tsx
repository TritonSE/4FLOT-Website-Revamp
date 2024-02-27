"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

import NewsletterArchive from "../../components/NewsletterArchive";
import NewsletterCard from "../../components/NewsletterCard";
import BackgroundHeader from "@/components/BackgroundHeader";
import NewsletterPopup from "../../components/NewsletterPopup";
import ButtonNewsletter from "../../components/ButtonNewsletter";





const newsletter1 = {
  _id: "1",
  image: "/newsletter1.png",
  title: "Winter 2023: Title",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
};

const newsletter2 = {
  _id: "2",
  image: "/newsletter2.png",
  title: "Special Event Newsletter",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
};

const newsletter3 = {
  _id: "3",
  image: "/newsletter2.png",
  title: "Special Event Newsletter",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
};

const newsletter4 = {
  _id: "4",
  image: "/newsletter2.png",
  title: "Special Event Newsletter",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
};

const newsletter5 = {
  _id: "2",
  image: "/newsletter2.png",
  title: "Special Event Newsletter",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
};

export default function Newsletter() {

  const [popupOpen, setPopup] = useState(false);
  const handleSubscribeClick = () => {
    setPopup(true);
  };

  return (
    <main>
    <BackgroundHeader
      backgroundImage="/PeopleHugging.png"
      header="Our Impact"
      title="Newsletter"
      description="4FLOT is committed in preventing and ending homelessness,          
      hunger and disparity in underprivileged communities. "
    />
  <div className={styles.text}>
    <div className={styles.subtitle}>
      Quaterly Updates  
    </div>
    <div className = {styles.containerCardsAndText}>
    <div className={styles.description}>
    Description of general newsletter content, what to expect in the newsletters, etc.
    </div>
    <ButtonNewsletter text="Subscribe For Updates" onClick={handleSubscribeClick}></ButtonNewsletter>
    </div>
    <NewsletterPopup open={popupOpen} setOpen={setPopup} />
  </div>
    <div className={styles.page}>
        <NewsletterCard newsletter={newsletter1}></NewsletterCard>
        <NewsletterCard newsletter={newsletter2}></NewsletterCard>
        <div className={styles.titlelarge}>Archive</div>
        <NewsletterArchive year="2024" newsletters={[newsletter5]} />
        <NewsletterArchive
            year="2023"
            newsletters={[newsletter1, newsletter2, newsletter3, newsletter4]}
        />
    </div>
    </main>
  );
}
