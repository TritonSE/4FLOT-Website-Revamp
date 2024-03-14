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
  type: string;
};

const AboutCard: React.FC<AboutCardProps> = ({
  ourText,
  title,
  description,
  imageUrl,
  buttonUrl,
  buttonText,
  type,
}) => {
  if (type === "team") {
    return (
      <div className={styles.fullContainerT}>
        <div className={styles.fullImageT}>
          <Image fill={true} src={imageUrl} alt="Card image" />
        </div>
        <div className={styles.cardContainerT}>
          <div className={styles.ourContainerT}>{ourText}</div>
          <h2 className={styles.titleContainerT}>{title}</h2>
          <p className={styles.textContainerT}>{description}</p>
          <div className={styles.buttonContainerT}>
            <Link href={buttonUrl} className={styles.buttonText}>
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (type === "contact") {
    return (
      <div className={styles.fullContainerC}>
        <div className={styles.fullImageC}>
          <Image fill={true} src={imageUrl} alt="Card image" />
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.blueRingC}>
            <circle cx="100" cy="100" fill="#0370BB" />
          </svg>
        </div>
        <div className={styles.cardContainerC}>
          <div className={styles.ourContainerC}>{ourText}</div>
          <h2 className={styles.titleContainerC}>{title}</h2>
          <p className={styles.textContainerC}>{description}</p>
          <div className={styles.buttonContainerC}>
            <Link href={buttonUrl} className={styles.buttonText}>
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.fullContainer}>
        <div className={styles.fullImage}>
          <Image layout="fill" src={imageUrl} alt="Card image" z-index="2" />
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
  }
};

export default AboutCard;
