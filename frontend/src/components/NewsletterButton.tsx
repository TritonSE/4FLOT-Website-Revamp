import React from "react";
import Link from "next/link";

import styles from "./NewsletterButton.module.css";
import { Newsletter } from "../api/newsletter";




type ButtonProps = {
  text: string;
  link: string;
  newsletter: Newsletter;

};

const NewsletterArchive = ({ text, link, newsletter}: ButtonProps) => {
  return (
    <Link href={`/newsletter/${newsletter._id}`}>
      <button className={styles.button}>
        <p>{newsletter.title}</p>
      </button>
    </Link>
  );
};

export default NewsletterArchive;
