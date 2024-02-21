import Image from "next/image";
import React from "react";

import "./testimonialCard.css";
import type { Testimonial } from "../api/testimonial";

type CardProps = {
  testimonial: Testimonial | null | undefined;
};

const TestimonialCard = ({ testimonial }: CardProps) => {
  if (testimonial) {
    return (
      <main className="testimonial-card-container">
        <Image src={testimonial.image} alt="image" width={400} height={200} />
        <div className="testimonial-text-container">
          <h1>&#8220;{testimonial.title}&#8221;</h1>
          <p>{testimonial.description}</p>
        </div>
      </main>
    );
  }
  return null;
};

export default TestimonialCard;
