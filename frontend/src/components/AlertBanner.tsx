import Image from "next/image";

import styles from "./AlertBanner.module.css";

type ButtonProps = {
  text: string;
  img?: string;
  undo?: () => void;
  onClose: () => void;
};

const AlertBanner = ({ text, img, undo, onClose }: ButtonProps) => {
  return (
    <div className={styles.wrapper} role="alert" id="alert-banner">
      <div className={styles.alert}>
        {img && <Image src={img} alt="Alert icon" width={18} height={18} />}
        <div>{text}</div>
      </div>
      <div className={styles.rightElems}>
        {undo && (
          <button className={styles.undoButton} onClick={undo}>
            Undo
          </button>
        )}
        <button className={styles.closeButton} onClick={onClose}>
          <Image src="/ic_close1.svg" alt="Close alert" width={14} height={14} />
        </button>
      </div>
    </div>
  );
};
export default AlertBanner;
