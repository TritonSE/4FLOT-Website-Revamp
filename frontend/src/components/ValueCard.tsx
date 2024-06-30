import Image from "next/image";
import React from "react";

import styles from "./ValueCard.module.css";

type ValueCardProps = {
  iconSrc: string;
  title: string;
  description: string;
};

const ValueCard = ({ iconSrc, title, description }: ValueCardProps) => {
  return (
    <div className={styles.customRectangle}>
      <div className={styles.circleWhite}>
        <Image
          src={iconSrc}
          alt="Value Icon"
          width={90}
          height={90}
          className={styles.centeredImage}
          style={{ objectFit: "fill" }}
        />
      </div>
      <div className={styles.RectangleTitle}>{title}</div>
      <div className={styles.BodytextInsideRectangle}>{description}</div>
    </div>
  );
};

export default ValueCard;
