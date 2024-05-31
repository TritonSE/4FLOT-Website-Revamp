"use client";
import Image from "next/image";
import React, { useState } from "react";

import styles from "./Collapsable.module.css";
import { usePage } from "./admin/pageeditor/PageProvider";
import { GalleryBox } from "./admin/pageeditor/inputBoxes/GalleryBox";

type CollapsableProps = {
  title: string;
  subsection: string[];
  textbox: string[];
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Collapsable = ({ title, subsection, textbox, onChange }: CollapsableProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const page = usePage();

  const toggleSection = () => {
    setOpen(!open);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Auto increase height when typing
    if (event && event.target) {
      event.target.style.height = "auto";
      event.target.style.height = 2 + event.target.scrollHeight + "px";
    }
    // Call onChange function
    onChange(event);
  };

  const field = page.fields[page.fields.findIndex((f) => f.name === title)];
  const hasGalleryBox = field.type === "gallery";

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
          {hasGalleryBox && (
            <div>
              <p className={styles.subtitle}>Image Upload</p>
              <GalleryBox field={field} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Collapsable;
