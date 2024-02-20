import React from "react";

import styles from "./NewsletterButton.module.css";

type ButtonProps = {
  text: string;
};

const NewsletterArchive = ({ text }: ButtonProps) => {
  return (
    <button className={styles.button}>
      <p>{text}</p>
    </button>
  );
};

export default NewsletterArchive;
