import Image from "next/image";
import Link from "next/link";
import React from "react";

import styles from "./AboutCardL.module.css";

type AboutCardLProps = {
  ourText: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonUrl: string;
  buttonText: string;
};

const AboutCardL: React.FC<AboutCardLProps> = ({
  ourText,
  title,
  description,
  imageUrl,
  buttonUrl,
  buttonText,
}) => {
  return (
    <div className={styles.fullContainer}>
      <div className={styles.fullImage}>
        <Image
          fill={true}
          src={imageUrl}
          alt="Card image"
          /*layout="fill"*/
          /*objectFit="cover"*/
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={styles.blueRing}>
          <circle
            cx="17.9346"
            cy="17.9318"
            r="15.536"
            transform="rotate(79.1774 17.9346 17.9318)"
            stroke="#428BCD"
            stroke-width="3"
          />
        </svg>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.ourContainer}>{ourText}</div>
        <h2 className={styles.titleContainer}>{title}</h2>
        <p className={styles.textContainer}>{description}</p>
        <div className={styles.buttonContainer}>
          <Link href={buttonUrl} className={styles.buttonText}>
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutCardL;
