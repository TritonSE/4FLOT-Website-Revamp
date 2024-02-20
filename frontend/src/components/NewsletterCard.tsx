import Image from "next/image";
import React from "react";

import styles from "./NewsletterCard.module.css";

type NewsletterCardProps = {
  image: string;
  title: string;
  description: string;
  date: string;
};

const NewsletterCard = ({ image, title, description, date }: NewsletterCardProps) => {
  return (
    <main className={styles.newsletterCardContainer}>
      <Image src={image} alt="image" width={400} height={200} />
      <div className={styles.newsletterTextContainer}>
        <div className="flex flex-row justify-between">
          <h1>{title}</h1>
          <p className={styles.newsletterDate}>{date}</p>
        </div>
        <p>{description}</p>
      </div>
    </main>
  );
};

export default NewsletterCard;
