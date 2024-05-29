import { usePage } from "../../../components/admin/pageeditor/PageProvider";

import styles from "./CancelButton.module.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

const CancelButton = ({ text, onClick }: ButtonProps) => {
  const page = usePage();
  const color = page.isEdited ? "active" : "unactive";
  return (
    <div
      className={styles.button}
      style={
        color === "unactive"
          ? { background: "#D8D8D8", fontWeight: "400", border: "#D8D8D8", color: "#FFFFFF" }
          : { fontWeight: "650" }
      }
    >
      <button className={styles.buttonBody} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default CancelButton;
