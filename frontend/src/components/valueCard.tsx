import React from "react";
import styles from "./valueCard.module.css";


type ValueCardProps = {
    iconSrc: string;
    title: string;
    description: string;
  };

const ValueCard = ({ iconSrc, title, description }: ValueCardProps) => {
return (
    <div className={styles.customRectangle}>
        <div className={styles.circleWhite}>
            <img src = {iconSrc} alt="Image 1" className={styles.centeredImage} /></div>
            <div className={styles.RectangleTitle}>{title}</div>
            <div className={styles.BodytextInsideRectangle}>{description}</div>
    </div>

);
};



export default ValueCard;
