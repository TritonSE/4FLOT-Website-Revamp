import Image from "next/image";
import Link from "next/link";
import React from "react";

import { EventDetails } from "../api/eventDetails";

import styles from "./EventsCard.module.css";

// TODO: Change props to include className and change to an EventDetails type
type CardProps = {
  className?: string;
  event: EventDetails;
  page: string;
};

// TODO: Make class names responsive
const EventsCard = ({ event, page }: CardProps) => {
  if (page === "home") {
    return (
      <main className={styles.cardContainer} style={{ width: `400px`, height: `530px` }}>
        <div style={{ width: "400px", height: "216px", overflow: "hidden" }}>
          <Image src={event.imageURI} alt="image" width={578} height={270} />
        </div>

        <div className={styles.homeCardContent}>
          <div className={styles.textContainer}>
            <div className={styles.cardTitle}>{event.name}</div>
            <div className={styles.homeCardDescription}>{event.description}</div>
          </div>
          <Link href={`/upcoming-events/${event._id}`}>
            <button className={styles.homeCardButton}>Learn More</button>
          </Link>
        </div>
      </main>
    );
  } else if (page === "upcoming-events") {
    return (
      <main className={styles.cardContainer} style={{ width: `578px`, height: `536px` }}>
        <div style={{ width: "578px", height: "270px", overflow: "hidden" }}>
          <Image src={event.imageURI} alt="image" width={578} height={270} />
        </div>

        <div className={styles.cardContent}>
          <div className={styles.textContainer}>
            <div className={styles.cardTitle}>{event.name}</div>
            <div className={styles.cardDescription}>{event.description}</div>
          </div>
          <Link href={`/upcoming-events/${event._id}`}>
            <button className={styles.cardButton}>Learn More</button>
          </Link>
        </div>
      </main>
    );
  } else if (page === "past-events") {
    return (
      <main className={styles.cardContainer} style={{ width: `578px`, height: `450px` }}>
        <div style={{ width: "578px", height: "270px", overflow: "hidden" }}>
          <Image src={event.imageURI} alt="image" width={578} height={270} />
        </div>

        <div className={styles.cardContent}>
          <div className={styles.textContainer}>
            <div className={styles.cardTitle}>{event.name}</div>
            <div className={styles.cardDescription}>{event.description}</div>
          </div>
        </div>
      </main>
    );
  }
};

export default EventsCard;
