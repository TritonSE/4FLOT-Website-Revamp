import React from "react";
import Link from "next/link";

import styles from "./NewsletterButton.module.css";

type ButtonProps = {
  text: string;
  link: string;
};

const NewsletterArchive = ({ text, link}: ButtonProps) => {
  return (
    <button className={styles.button}>
     <Link href={link}><p>{text}</p></Link>
    </button>
  );
};

export default NewsletterArchive;
