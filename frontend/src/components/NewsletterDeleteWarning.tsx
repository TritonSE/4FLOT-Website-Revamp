"use client";

import Image from "next/image";
import React from "react";

import styles from "./NewsletterDeleteWarning.module.css";

type NewsletterDeleteWarningProps = {
  save: () => void;
  discard: () => void;
  onClose: () => void;
};

export const NewsletterDeleteWarning = ({
  save,
  discard,
  onClose,
}: NewsletterDeleteWarningProps) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.closeButton} onClick={discard}>
        <Image src="/ic_close2.svg" alt="Close alert" width={18} height={18} />
      </button>
      <h1>Are you sure you want to delete this newsletter?</h1>
      <p>This action is permanent and cannot be undone.</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.deleteButton} onClick={discard}>
          {" "}
          No, cancel{" "}
        </button>
        <button className={styles.saveButton} onClick={save}>
          {" "}
          Delete newsletter{" "}
        </button>
      </div>
    </div>
  );
};