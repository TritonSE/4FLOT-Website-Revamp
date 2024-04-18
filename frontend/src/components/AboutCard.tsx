// import Image from "next/image";
import React from "react";

import styles from "./AboutCard.module.css";
import Button from "./Button";

type AboutCardProps = {
  ourText: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonUrl: string;
  buttonText: string;
  contentSide: string;
};

const AboutCard: React.FC<AboutCardProps> = ({
  ourText,
  title,
  description,
  // imageUrl,
  buttonUrl,
  buttonText,
  contentSide,
}) => {
  if (contentSide === "left") {
    return (
      <div className={styles.rectangleContainer}>
        <div className={styles.contentLeft}>
          <div className={styles.subtitleText}>{ourText}</div>
          <div className={styles.titleText}>{title}</div>
          <div className={styles.descriptionText}>{description}</div>
          <Button text={buttonText} link={buttonUrl} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.rectangleContainer}>
        <div className={styles.contentRight}>
          <div className={styles.subtitleText}>{ourText}</div>
          <div className={styles.titleText}>{title}</div>
          <div className={styles.descriptionText}>{description}</div>
          <Button text={buttonText} link={buttonUrl} />
        </div>
      </div>
    );
  }
};

export default AboutCard;
