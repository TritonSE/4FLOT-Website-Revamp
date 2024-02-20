import Image from "next/image";
import React from "react";

import styles from "./NewsletterCard.module.css";

import type { Newsletter } from "../api/newsletter";

type NewsletterCardProps = {
  newsletter: Newsletter;
};

const NewsletterCard = ({ newsletter }: NewsletterCardProps) => {
  return (
    <main className={styles.newsletterCardContainer}>
      <Image src={newsletter.image} alt="image" width={400} height={200} />
      <div className={styles.newsletterTextContainer}>
        <div className="flex flex-row justify-between items-center">
          <h1>{newsletter.title}</h1>
          <p className={styles.newsletterDate}>{newsletter.date}</p>
        </div>
        <p>{newsletter.description}</p>
      </div>
    </main>
  );
};

export default NewsletterCard;
