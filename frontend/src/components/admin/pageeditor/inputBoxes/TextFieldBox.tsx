import { ChangeEvent } from "react";

import { TextareaAutosize } from "@mui/material";

import { Field, TextData } from "../../../../api/pageeditor";
import { usePageDispatch } from "../PageProvider";

import styles from "./TextFieldBox.module.css";

type TextFieldProps = {
  field: Field;
};

export const TextFieldBox = ({ field }: TextFieldProps) => {
  const dispatch = usePageDispatch();

  function handleFieldChange(e: ChangeEvent<HTMLTextAreaElement>) {
    // Auto increase height when typing
    e.target.style.height = "auto";
    e.target.style.height = 2 + e.target.scrollHeight + "px";

    // dispatch a change to a text field
    dispatch({
      type: "edit_field",
      setIsEdited: true,
      field: {
        ...field,
        data: {
          text: e.target.value,
        },
      },
    });
  }

  const text = (field.data as TextData).text;

  return (
    <div>
      <p className={styles.subtitle}>{field.name}</p>
      <TextareaAutosize className={styles.basicInput} onInput={handleFieldChange} value={text} />
    </div>
  );
};
