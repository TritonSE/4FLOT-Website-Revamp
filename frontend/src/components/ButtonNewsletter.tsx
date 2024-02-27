import React from "react";
import { MouseEvent } from "react"; // Import MouseEvent type

import styles from "./ButtonNewsletter.module.css";

type ButtonProps = {
  text: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void; // Define onClick prop
};

const ButtonNewsletter = ({ text, onClick }: ButtonProps) => {
  return (
    <div className={styles.button}>
      <button className={styles.buttonBody} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default ButtonNewsletter;
