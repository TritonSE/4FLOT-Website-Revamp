import Link from "next/link";
import React from "react";

import styles from "./PageToggle.module.css";

type PageToggleProps = {
  pages?: string[];
  links?: string[];
  onTogglePage?: (index: number) => void;
  currPage?: number;
  refreshPage?: boolean;
};

const PageToggle = ({ pages, links, onTogglePage, currPage, refreshPage }: PageToggleProps) => {
  if (pages && links) {
    return (
      <div className={styles.container}>
        {pages.map((page, index) => {
          const link = links[index];
          return refreshPage ? (
            <a
              key={index}
              href={link}
              className={currPage === index ? styles.menuActive : styles.menu}
            >
              {page}
            </a>
          ) : (
            <Link
              key={index}
              href={link}
              className={currPage === index ? styles.menuActive : styles.menu}
            >
              {page}
            </Link>
          );
        })}
      </div>
    );
  } else if (pages && onTogglePage) {
    return (
      <div className={styles.container}>
        {pages.map((page, index) => (
          <button
            key={index}
            className={currPage === index ? styles.menuActive : styles.menu}
            onClick={() => {
              onTogglePage(index);
            }}
          >
            {page}
          </button>
        ))}
      </div>
    );
  }
};

export default PageToggle;
