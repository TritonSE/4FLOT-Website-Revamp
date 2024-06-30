import Image from "next/image";
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
      <Image
        src={iconSrc}
        alt="Contact Icon"
        width={50}
        height={50}
        className={styles.leftImage}
        style={{ objectFit: "scale-down" }}
      />
      <div className={styles.textWrapper}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardDescription}>
          {description.map((txt, idx) => (
            <p key={`${txt}-${idx}`}>{txt}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ContactInfoCard;
