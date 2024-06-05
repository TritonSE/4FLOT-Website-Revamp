import React from "react";

import styles from "./TestimonialCard.module.css";

import type { Testimonial } from "../api/testimonial";

type CardProps = {
  testimonial: Testimonial;
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
  const hasImage = testimonial.image !== "";
  const title = testimonial.type === "quote" ? `"${testimonial.title}"` : testimonial.title;
  if (testimonial) {
    return (
      <div
        className={styles.testimonialCardContainer}
        style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
      >
        <div
          style={{
            width: imgWidth,
            height: imgHeight,
            borderRadius: "10px 10px 0 0",
            backgroundImage: `url(${hasImage ? testimonial.image : "/Checker.png"})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className={styles.textContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{testimonial.description}</div>
        </div>
      </div>
    );
  }
  return null;
};

export default TestimonialCard;
