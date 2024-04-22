import Link from "next/link";
import React from "react";

import styles from "./CancelButton.module.css";

type ButtonProps = {
  text: string;
  link?: string;
  onClick?: () => void;
};

const Button = ({ text, link, onClick }: ButtonProps) => {
  if (link) {
    return (
      <Link href={link}>
        <div className={styles.button}>
          <button className={styles.buttonBody}>{text}</button>
        </div>
      </Link>
    );
  } else {
    return (
      <div className={styles.button}>
        <button className={styles.buttonBody} onClick={onClick}>
          {text}
        </button>
      </div>
    );
  }
};

export default Button;
