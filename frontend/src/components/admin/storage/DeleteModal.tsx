import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Modal } from "@mui/material";
import { ReactNode, useState } from "react";

import styles from "./DeleteModal.module.css";

type DeleteProps = {
  handleDelete: () => void;
  disabled: boolean;
  children: ReactNode;
};
export default function DeleteModal({ handleDelete, disabled, children }: DeleteProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className="w-screen h-screen flex bg-transparent m-0 p-0 justify-center items-center">
          <div>
            <div className="w-full h-4 px-2 flex justify-end">
              <button onClick={handleClose}>
                <CloseRoundedIcon className="text-[#C6C6C6] hover:scale-110 active:scale-150 transition-all duration-300 ease-in" />
              </button>
            </div>
            <div className="-mt-6  w-[567px] h-[214px] py-8 px-8 flex flex-col justify-between bg-white rounded-lg gap-6">
              <div className="flex flex-col gap-5 w-full h-auto">
                <p className={styles.title}>Are you sure you want to delete this photo?</p>
                <p className={styles.subtitle}>This action is permanent and cannot be undone.</p>
              </div>
              <div className="m-0 p-0 flex flex-row justify-end w-full h-auto gap-[1.5rem]">
                <button
                  onClick={handleClose}
                  className="m-0 w-[140px] h-10 rounded border border-rose-700 text-rose-700 px-3 py-2 font-bold shadow-sm hover:ring-1 hover:font-extrabold hover:ring-rose-700"
                >
                  No, Cancel
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    handleDelete();
                  }}
                  className="m-0 w-[140px] h-10 rounded text-white bg-[#694C97] px-3 py-2 font-bold shadow-sm hover:bg-purple-900 hover:font-extrabold"
                >
                  Delete Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <button onClick={handleClick} disabled={disabled}>
        {children}
      </button>
    </div>
  );
}
