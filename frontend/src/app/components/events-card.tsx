import React from "react";

import styles from "../styles/events-card.module.css";

type CardProps = {
  imageSrc: string;
  title: string;
  description: string;
};

const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className={styles.card}>
      <img className={styles.cardImage} src={imageSrc} alt="Link to Instagram" />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
        <button className={styles.cardButton}> Learn More</button>
      </div>
    </div>
  );
};

export default Card;
