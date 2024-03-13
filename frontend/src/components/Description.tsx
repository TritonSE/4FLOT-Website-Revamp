import React from "react";

import styles from "./Description.module.css"; // Importing CSS module for styles

type DescriptionProps = {
  title: string;
  description: string;
};

const Description: React.FC<DescriptionProps> = ({ title, description }) => {
  return (
    <div className={styles.description}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{description}</p>
    </div>
  );
};

export default Description;
