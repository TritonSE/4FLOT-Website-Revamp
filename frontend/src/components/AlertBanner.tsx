import Image from "next/image";

import styles from "./AlertBanner.module.css";

type ButtonProps = {
  text: string;
  img: string;
  onClose: () => void;
};

const AlertBanner = ({ text, img, onClose }: ButtonProps) => {
  return (
    <div className={styles.wrapper} role="alert" id="alert-banner">
      <div className={styles.alert}>
        <Image src={img} alt="Alert icon" width={18} height={18} />
        <div>{text}</div>
      </div>
      <div>
        <button className={styles.closeButton} onClick={onClose}>
          <Image src="/close_icon.svg" alt="Close alert" width={14} height={14} />
        </button>
      </div>
    </div>
  );
};
export default AlertBanner;
