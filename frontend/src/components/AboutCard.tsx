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
  imageUrl,
  buttonUrl,
  buttonText,
  contentSide,
}) => {
  const imageStyle = {
    backgroundImage: `url(${imageUrl})`,
  };
  if (contentSide === "left") {
    return (
      <div className={styles.card}>
        <div className={styles.rectangleContainerLeft}>
          <div className={styles.contentLeft}>
            <div className={styles.subtitleText}>{ourText}</div>
            <div className={styles.titleText}>{title}</div>
            <div className={styles.descriptionText}>{description}</div>
            <Button text={buttonText} link={buttonUrl} />
          </div>
        </div>
        <div className={styles.imageContainerRight} style={imageStyle}></div>
      </div>
    );
  } else {
    return (
      <div className={styles.card}>
        <div className={styles.imageContainerLeft} style={imageStyle}></div>
        <div className={styles.rectangleContainerRight}>
          <div className={styles.contentRight}>
            <div className={styles.subtitleText}>{ourText}</div>
            <div className={styles.titleText}>{title}</div>
            <div className={styles.descriptionText}>{description}</div>
            <Button text={buttonText} link={buttonUrl} />
          </div>
        </div>
      </div>
    );
  }
};

export default AboutCard;
