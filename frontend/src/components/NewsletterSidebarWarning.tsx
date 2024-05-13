"use client";

import Image from "next/image";
import React from "react";

import styles from "./NewsletterSidebarWarning.module.css";

type NewsletterSidebarWarningProps = {
  save: () => void;
  discard: () => void;
  onClose: () => void;
};

export const NewsletterSidebarWarning = ({
  save,
  discard,
  onClose,
}: NewsletterSidebarWarningProps) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.closeButton} onClick={onClose}>
        <Image src="/ic_close2.svg" alt="Close alert" width={18} height={18} />
      </button>
      <h1>You have unsaved changes!</h1>
      <p>Do you want to save the changes you made to this event?</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.deleteButton} onClick={discard}>
          {" "}
          Discard changes{" "}
        </button>
        <button className={styles.saveButton} onClick={save}>
          {" "}
          Save changes{" "}
        </button>
      </div>
    </div>
  );
};
