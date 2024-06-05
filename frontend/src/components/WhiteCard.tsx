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
          <div className={styles.imageContainer}>
            <Image
              src={imageUrl}
              alt="Card image"
              width={88} // Set the width to a fixed value
              height={88} // Set the height to a fixed value
              className="card-image"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardDescription}>{description}</p>
        </div>
        <div className="m-1">
          <Button text={buttonText} link={buttonUrl} />
        </div>
      </div>
    </div>
  );
};

export default WhiteCard;
