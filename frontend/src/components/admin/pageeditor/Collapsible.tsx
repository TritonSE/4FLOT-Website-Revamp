"use client";

import Image from "next/image";
import React, { ReactNode, useState } from "react";

import styles from "./Collapsible.module.css";

type CollapsibleProps = {
  title: string;
  children: ReactNode;
};

export const Collapsible = ({ title, children }: CollapsibleProps) => {
  const [open, setOpen] = useState<boolean>(true);

  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <div>
      <button onClick={toggleOpen} className={styles.collapsible}>
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
      {open && children}
    </div>
  );
};
