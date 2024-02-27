import Image from "next/image";
import Link from "next/link";
import React from "react";

import { EventDetails } from "../../api/eventDetails";
import styles from "../styles/events-card.module.css";

// TODO: Change props to include className and change to an EventDetails type
type CardProps = {
  event: EventDetails;
};
// TODO: Add className prop to the div

// TODO: Make class names responsive
const Card: React.FC<CardProps> = ({ event }: CardProps) => {
  return (
    <div className={styles.card}>
      <Image
        className={styles.cardImage}
        src={event.imageURI}
        height={480}
        width={640}
        alt="Link to Instagram"
      />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{event.name}</h2>
        <p className={styles.cardDescription}>{event.description}</p>
        <button className={styles.cardButton}>
          <Link href={`/events/${event._id}`}>Learn More</Link>
        </button>
      </div>
    </div>
  );
};

export default Card;
