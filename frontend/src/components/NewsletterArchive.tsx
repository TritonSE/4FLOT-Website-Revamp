import Image from "next/image";
import React, { useState } from "react";

import styles from "./NewsletterArchive.module.css";
import NewsletterButton from "./NewsletterButton";
import type { Newsletter } from "../api/newsletter";

type NewsletterArchiveProps = {
  year: string;
  newsletters: Newsletter[];
};

const NewsletterArchive = ({ year, newsletters }: NewsletterArchiveProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const toggleCollapse = (event: React.MouseEvent) => {
    event.preventDefault();
    setCollapsed(!collapsed);
  };

  return (
    <main className={styles.newsletterArchiveContainer}>
      <div className={styles.panel} onClick={toggleCollapse}>
        <div className={styles.panelText}>
          <h1>{year}</h1>
          <Image
            width={48}
            height={48}
            className={collapsed ? styles.caretDown : ""}
            src="ic_caretdown.svg"
            alt=""
          />
        </div>
        <hr className={styles.separator}></hr>
      </div>
      <div hidden={collapsed}>
        <div className={styles.archivedButtonContainer}>
          {newsletters.map((newsletter) => (
            <NewsletterButton key={newsletter._id} text={newsletter.title} link={`/newsletter/${newsletter._id}`} newsletter={newsletter}/>          
          ))}
        </div>
      </div>
    </main>
  );
};

export default NewsletterArchive;