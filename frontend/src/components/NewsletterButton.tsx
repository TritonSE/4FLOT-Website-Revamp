import Link from "next/link";
import React from "react";

import { Newsletter } from "../api/newsletter";

import styles from "./NewsletterButton.module.css";

type ButtonProps = {
  newsletter: Newsletter;
};

const NewsletterButton = ({ newsletter }: ButtonProps) => {
  return (
    <Link href={`/newsletter/${newsletter._id}`}>
      <button className={styles.button}>
        <p>{newsletter.title}</p>
      </button>
    </Link>
  );
};

export default NewsletterButton;
