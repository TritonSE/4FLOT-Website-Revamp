import Image from "next/image";
import React from "react";

import "./eventCard.css";
import type { Event } from "../../api/events";

type CardProps = {
  event: Event | null | undefined;
};

const EventCard = ({ event }: CardProps) => {
  if (event) {
    return (
      <main className="event-card-container">
        <Image src={event.image} alt="image" width={400} height={200} />
        <div className="event-text-container">
          <h1>{event.title}</h1>
          <p>{event.description}</p>
        </div>
      </main>
    );
  }
  return null;
};

export default EventCard;
