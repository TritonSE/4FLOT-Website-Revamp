import Image from "next/image";
import Link from "next/link";
import React from "react";

import { EventDetails } from "../api/eventDetails";

import styles from "./EventsCard.module.css";

// TODO: Change props to include className and change to an EventDetails type
type CardProps = {
  className?: string;
  event: EventDetails;
};

// TODO: Make class names responsive
const EventsCard = ({ event }: CardProps) => {
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
        <Link href={`/events/${event._id}`}>
          <button className={styles.cardButton}>Learn More</button>
        </Link>
      </div>
    </main>
  );
};

export default EventsCard;
