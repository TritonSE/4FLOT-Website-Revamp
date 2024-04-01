import Image from "next/image";
import React from "react";

import Button from "./Button";
import styles from "./WhiteCard.module.css";

type WhiteCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  buttonUrl: string;
  buttonText: string;
};

const WhiteCard: React.FC<WhiteCardProps> = ({
  title,
  description,
  imageUrl,
  buttonUrl,
  buttonText,
}) => {
  return (
    <div className={styles.whiteCardContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.dataContainer}>
          <div className={styles.cardImageContainer}>
            <Image
              src={imageUrl}
              alt="Card image"
              layout="fill"
              objectFit="cover"
              className="card-image"
              priority
            />
          </div>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardDescription}>{description}</p>
        </div>

        <Button text={buttonText} link={buttonUrl} />
      </div>
    </div>
  );
};

export default WhiteCard;
