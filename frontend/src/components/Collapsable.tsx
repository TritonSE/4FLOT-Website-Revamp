"use client";
import Image from "next/image";
import React, { useState } from "react";

import styles from "./Collapsable.module.css";

type CollapsableProps = {
  title: string;
  subsection: string[];
  textbox: string[];
};

const Collapsable = ({ title, subsection, textbox }: CollapsableProps) => {
  const [open, setOpen] = useState<boolean>(true);

  const toggleSection = () => {
    setOpen(!open);
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
        <a>{title}</a>
      </button>
      {open && (
        <div className={styles.content}>
          {subsection.map((subtitle, index) => {
            const text = textbox[index];
            return (
              // eslint-disable-next-line react/jsx-key
              <div>
                <p className={styles.subtitle}>{subtitle}</p>
                <div className={styles.basicInput} contentEditable>
                  {text}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Collapsable;
