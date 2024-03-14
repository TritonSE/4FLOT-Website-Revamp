// NewsletterDisplay.tsx
import React, { useEffect, useState } from "react";
import styles from "./newsletterDisplay.module.css";
import BackgroundHeader from "@/components/BackgroundHeader";

type NewsletterDisplayProps = {
  newsletter: {
    image: string;
    title: string;
    description: string;
    date: string;
  };
};

const NewsletterDisplay: React.FC<NewsletterDisplayProps> = ({ newsletter }) => {
    const { image, title, description, date } = newsletter;     
    return (
        <main>
        <BackgroundHeader
          backgroundImage="/PeopleHugging.png"
          header="Our Impact"
          title="The 4FLOT Quaterly"
          description="4FLOT is committed in preventing and ending homelessness, hunger and 
          disparity in underprivileged communities."
        />
        <div className={styles.text}>
          <div className={styles.subtitle}>{title}</div>
            <p className={styles.description}>{date}</p>
        </div>
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        
        </main>
      );
  return null;
};

export default NewsletterDisplay;
