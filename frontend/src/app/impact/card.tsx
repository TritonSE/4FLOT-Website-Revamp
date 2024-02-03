import Image from "next/image";
import React from "react";

import "./card.css";
import type { Testimonial } from "../../api/testimonial";

type CardProps = {
  testimonial: Testimonial | null | undefined;
};

const Card = ({ testimonial }: CardProps) => {
  if (testimonial) {
    return (
      <main className="card-container">
        <Image src={testimonial.image} alt="image" width={400} height={200} />
        <h1>{testimonial.quote}</h1>
        <p>{testimonial.description}</p>
      </main>
    );
  }
  return null;
};

export default Card;
