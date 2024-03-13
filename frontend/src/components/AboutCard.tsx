import Image from "next/image";
import Link from "next/link";
import React from "react";

import styles from "./AboutCard.module.css";

type AboutCardProps = {
  ourText: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonUrl: string;
  buttonText: string;
};

const AboutCard: React.FC<AboutCardProps> = ({
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
          layout="fill"
          src={imageUrl}
          alt="Card image"
          z-index="2"
          /*layout="fill"*/
          /*objectFit="cover"*/
        />
        <svg xmlns="http://www.w3.org/2000/svg" className={styles.blueCirc}>
          <circle cx="100" cy="100" fill="#0370BB" />
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

export default AboutCard;
