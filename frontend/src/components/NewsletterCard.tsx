import Image from "next/image";
import Link from "next/link";
import React from "react";

import styles from "./NewsletterCard.module.css";

import type { Newsletter } from "../api/newsletter";

type NewsletterCardProps = {
  newsletter: Newsletter;
};

const NewsletterCard = ({ newsletter }: NewsletterCardProps) => {
  return (
    <Link href={`/newsletter/${newsletter._id}`}>
      <main className={styles.newsletterCardContainer} style={{ width: `1244px`, height: `394px` }}>
        <div style={{ width: "1244px", height: "282px", overflow: "hidden" }}>
          <Image src={newsletter.image} alt="image" width={1244} height={282} />
        </div>

        <div className={styles.newsletterTextContainer}>
          <div className="flex flex-row justify-between items-center">
            <h1>{newsletter.title}</h1>
            <p className={styles.newsletterDate}>{newsletter.date}</p>
          </div>
          <p>{newsletter.description}</p>
        </div>
      </main>
    </Link>
  );
};

export default NewsletterCard;
