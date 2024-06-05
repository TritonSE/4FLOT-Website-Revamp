"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Modal } from "@mui/material";
import { ReactNode, useState } from "react";

import styles from "./WarningModule.module.css";

type WarningModuleProps = {
  titleText: string;
  subtitleText: string;
  cancelText: string;
  actionText: string;
  cancel?: () => void;
  action: () => void;
  children: ReactNode;
};

export const WarningModule = ({
  titleText,
  subtitleText,
  cancelText,
  actionText,
  cancel,
  action,
  children,
}: WarningModuleProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    if (cancel) cancel();
    handleClose();
  };

  const handleAction = () => {
    action();
    handleClose();
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className="w-screen h-screen flex bg-transparent m-0 p-0 justify-center items-center">
          <div className={styles.wrapper}>
            <button className={styles.closeButton} onClick={handleClose}>
              <CloseRoundedIcon
                className={`${styles.closeIcon} text-[#C6C6C6] scale-90 hover:scale-100 active:scale-150 transition-all duration-300 ease-in`}
              />
            </button>
            <div className="flex flex-col gap-4 w-fit">
              <h1>{titleText}</h1>
              <p>{subtitleText}</p>
            </div>
            <div className={styles.buttonWrapper}>
              <button
                className={`${styles.deleteButton} hover:ring-1 hover:ring-rose-700`}
                onClick={handleCancel}
              >
                {cancelText}
              </button>
              <button className={`${styles.saveButton} hover:bg-purple-900`} onClick={handleAction}>
                {actionText}
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <button className="w-full" onClick={handleOpen}>
        {children}
      </button>
    </div>
  );
};
