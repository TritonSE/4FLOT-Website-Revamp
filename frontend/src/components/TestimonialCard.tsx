import Image from "next/image";
import React from "react";

import styles from "./TestimonialCard.module.css";

import type { Testimonial } from "../api/testimonial";

type CardProps = {
  testimonial: Testimonial | null | undefined;
  cardWidth: number;
  cardHeight: number;
  imgWidth: number;
  imgHeight: number;
};

const TestimonialCard = ({
  testimonial,
  cardWidth,
  cardHeight,
  imgWidth,
  imgHeight,
}: CardProps) => {
  if (testimonial) {
    return (
      <main
        className={styles.testimonialCardContainer}
        style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
      >
        <Image src={testimonial.image} alt="image" width={imgWidth} height={imgHeight} />
        <div className={styles.textContainer}>
          <div className={styles.title}>&#8220;{testimonial.title}&#8221;</div>
          <div className={styles.description}>{testimonial.description}</div>
        </div>
      </main>
    );
  }
  return null;
};

export default TestimonialCard;
