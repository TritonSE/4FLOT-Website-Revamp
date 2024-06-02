import React from "react";

import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className="w-[99vw] h-[87vh] flex justify-center items-center">
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingSpinner;
