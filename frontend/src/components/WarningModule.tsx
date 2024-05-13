"use client";

import Image from "next/image";
import React from "react";

import styles from "./WarningModule.module.css";

type WarningModuleProps = {
  titleText: string;
  subtitleText: string;
  cancelText: string;
  actionText: string;
  cancel: () => void;
  action: () => void;
  onClose: () => void;
};

export const WarningModule = ({
  titleText,
  subtitleText,
  cancelText,
  actionText,
  cancel,
  action,
  onClose,
}: WarningModuleProps) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.closeButton} onClick={onClose}>
        <Image src="/ic_close2.svg" alt="Close alert" width={18} height={18} />
      </button>
      <h1>{titleText}</h1>
      <p>{subtitleText}</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.deleteButton} onClick={cancel}>
          {cancelText}
        </button>
        <button className={styles.saveButton} onClick={action}>
          {actionText}
        </button>
      </div>
    </div>
  );
};
