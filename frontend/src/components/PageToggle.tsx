import Link from "next/link";
import React from "react";

import styles from "./PageToggle.module.css";

type PageToggleProps = {
  pages: string[];
  links: string[];
  currPage: number;
};

const PageToggle = ({ pages, links, currPage }: PageToggleProps) => {
  return (
    <div className={styles.container}>
      {pages.map((page, index) => {
        const link = links[index];
        return (
          <a
            key={index}
            href={link}
            className={currPage === index ? styles.menuActive : styles.menu}
          >
            {page}
          </a>
        );
      })}
    </div>
  );
};

export default PageToggle;
