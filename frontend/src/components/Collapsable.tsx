"use client";
import Image from "next/image";
import React, { useState } from "react";

import styles from "./Collapsable.module.css";

type CollapsableProps = {
  title: string;
  subsection: string[];
  textbox: string[];
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // The following are only for numbered lists (Our Team, Testimonials)
  listTitles?: string[];
  listText?: string[][];
};

const Collapsable = ({
  title,
  subsection,
  textbox,
  onChange,
  listTitles,
  listText,
}: CollapsableProps) => {
  const hasNumberedList = listTitles !== null && listText !== null;
  const [open, setOpen] = useState<boolean>(true);

  const toggleSection = () => {
    setOpen(!open);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Auto increase height when typing
    event.target.style.height = "auto";
    event.target.style.height = 2 + event.target.scrollHeight + "px";
    // Call onChange function
    onChange(event);
  };

  return (
    <div>
      <button onClick={toggleSection} className={styles.collapsible}>
        {open && (
          <Image
            style={{ transform: "rotate(180deg)" }}
            src="/ic_caretdown.svg"
            alt="^"
            width={24}
            height={24}
          />
        )}
        {!open && <Image src="/ic_caretdown.svg" alt="^" width={24} height={24} />}
        <a className={styles.title}>{title}</a>
      </button>
      {open && (
        <div className={styles.content}>
          {subsection.map((subtitle, index) => {
            const text = textbox[index];
            return (
              <div key={subtitle}>
                <p className={styles.subtitle}>{subtitle}</p>
                <textarea
                  className={styles.basicInput}
                  onInput={handleChange}
                  id={title + ": " + subtitle}
                  value={text}
                ></textarea>
              </div>
            );
          })}
          {hasNumberedList && (
            <div>
              <ol>
                {listText?.map((textArray, index) => {
                  let subtitle = "";
                  return listTitles?.map((listTitle, innerIndex) => {
                    if (innerIndex === 0) {
                      subtitle = index + 1 + ". \t" + listTitle;
                    } else {
                      subtitle = "\t\t" + listTitle;
                    }
                    return (
                      <li key={subtitle}>
                        <p className={styles.subtitle}>{subtitle}</p>
                        <textarea
                          className={styles.tabInput}
                          onInput={handleChange}
                          id={listTitle + ": " + index}
                          value={textArray[innerIndex]}
                        ></textarea>
                      </li>
                    );
                  });
                })}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Collapsable;
