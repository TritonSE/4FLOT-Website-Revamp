import Image from "next/image";
import React from "react";

import "./eventCard.css";
import type { Testimonial } from "../api/testimonial";

type CardProps = {
  testimonial: Testimonial | null | undefined;
};

const EventCard = ({ testimonial }: CardProps) => {
  if (testimonial) {
    return (
      <main className="event-card-container">
        <Image src={testimonial.image} alt="image" width={400} height={200} />
        <div className="event-text-container">
          <h1>{testimonial.title}</h1>
          <p>{testimonial.description}</p>
        </div>
      </main>
    );
  }
  return null;
};

export default EventCard;
