import { usePage } from "../../../components/admin/pageeditor/PageProvider";

import styles from "./SaveButton.module.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

const SaveButton = ({ text, onClick }: ButtonProps) => {
  const page = usePage();
  const color = page.isEdited ? "active" : "unactive";
  return (
    <div className={styles.button}>
      <button
        className={styles.buttonBody}
        onClick={onClick}
        style={
          color === "unactive"
            ? { background: "#D8D8D8", fontWeight: "400", borderRadius: "4px" }
            : {}
        }
      >
        {text}
      </button>
    </div>
  );
};

export default SaveButton;
