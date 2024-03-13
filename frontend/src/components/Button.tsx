import Link from "next/link";
import React from "react";

import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  link: string;
};

const Button = ({ text, link }: ButtonProps) => {
  return (
    <Link href={link}>
      <div className={styles.button}>
        <button className={styles.buttonBody}>{text}</button>
      </div>
    </Link>
  );
};

export default Button;
