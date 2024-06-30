import React from "react";

import styles from "./TextField.module.css";

export type TextFieldProps = {
  label: string;
  error?: boolean;
} & Omit<React.ComponentProps<"input">, "type">;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error = false, className, placeholder, ...props },
  ref,
) {
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
        <input ref={ref} type="text" className={inputClass} {...props} placeholder={placeholder} />
      </label>
    </div>
  );
});
