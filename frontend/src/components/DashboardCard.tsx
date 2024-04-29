import Image from "next/image";
import React from "react";

import styles from "./DashboardCards.module.css";

// TODO: Change props to include className and change to an EventDetails type
type CardProps = {
  className?: string;
  title: string;
  last_updated: string;
  imageURI: string;
  url: string;
};

// TODO: Make class names responsive
const DashboardCard = ({ title, last_updated, imageURI, url }: CardProps) => {
  return (
    <main className={styles.cardContainer} style={{ width: `520px`, height: `340px` }}>
      <div style={{ width: "520px", height: "340px" }}>
        <Image src={imageURI} alt="image" width={520} height={270} />
      </div>

      <div className={styles.homeCardContent}>
        <div className={styles.textContainer}>
          <div className={styles.cardTitle}>{title}</div>
          <div className={styles.homeCardDescription}>{`Last Updated: ${last_updated}`}</div>
        </div>
        <a href={`./${url}`}>
          <button className={styles.cardButton}>Open</button>
        </a>
      </div>
    </main>
  );
};

export default DashboardCard;
