import React from "react";

import styles from "./ContactInfoCard.module.css";

type ContactInfoCardProps = {
  iconSrc: string;
  title: string;
  description: string[];
};

const ContactInfoCard = ({ iconSrc, title, description }: ContactInfoCardProps) => {
  return (
    <div className={styles.customRectangle}>
      <img src={iconSrc} alt="Contact Icon" className={styles.leftImage} />
      <div className={styles.textWrapper}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardDescription}>
          {description.map((txt) => (
            // eslint-disable-next-line react/jsx-key
            <p>{txt}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ContactInfoCard;
