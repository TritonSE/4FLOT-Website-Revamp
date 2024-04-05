import Image from "next/image";
import Link from "next/link";
import React from "react";

import styles from "./EventsCard.module.css";

// TODO: Change props to include className and change to an EventDetails type
type CardProps = {
  className?: string;
  title: string;
  last_updated: string;
  imageURI: string;
  url:string;
};

// TODO: Make class names responsive
const DashboardCard = ({ title, last_updated, imageURI, url }: CardProps) => {
    return (
      <main className={styles.cardContainer} style={{ width: `400px`, height: `530px` }}>
        <div style={{ width: "400px", height: "216px", overflow: "hidden" }}>
          <Image src={imageURI} alt="image" width={578} height={270} />
        </div>

        <div className={styles.homeCardContent}>
          <div className={styles.textContainer}>
            <div className={styles.cardTitle}>{title}</div>
            <div className={styles.homeCardDescription}>{`Last Updated: ${last_updated}`}</div>
          </div>
          <Link href={`/events/${url}`}>
            <button className={styles.homeCardButton}>Open Editor</button>
          </Link>
        </div>
      </main>
    );
};

export default DashboardCard;
