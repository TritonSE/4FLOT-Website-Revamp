import React from "react";

import styles from "./TextField.module.css";

export type TextAreaProps = {
  label: string;
  error?: boolean;
} & Omit<React.ComponentProps<"textarea">, "type">;

export const TextArea = function ({
  label,
  error = false,
  className,
  placeholder,
  ...props
}: TextAreaProps) {
  let wrapperClass = styles.wrapper;
  if (className) {
    wrapperClass += ` ${className}`;
  }
  let inputClass = styles.input;
  if (error) {
    inputClass += ` ${styles.error}`;
  }
  return (
    <div className={wrapperClass}>
      <label className={styles.label}>
        <p>{label}</p>
        <textarea className={inputClass} {...props} placeholder={placeholder} />
      </label>
    </div>
  );
};
