import Link from "next/link";
import React from "react";

import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  link: string;
};

const Button = ({ text, link }: ButtonProps) => {
  return (
    <div className={styles.button}>
      <button type="submit" className={styles.buttonBody}>
        {link === "" ? text : <Link href={link}>{text}</Link>}
      </button>
    </div>
  );
};

export default Button;
