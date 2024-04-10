import Image from "next/image";
import React from "react";

import styles from "./AdminHeaderBar.module.css";

// type AdminHeaderBarProps = {
//   title: string;
// };

// const AdminHeaderBar = ({ title }: AdminHeaderBarProps) => {
const AdminHeaderBar = () => {
  return (
    <div className={styles.headerBar}>
      <div className={styles.title}>
        <p>Dashboard</p>
      </div>
      <div className={styles.user}>
        <Image src={"sampleUserPhoto.svg"} alt="userImage" width={36} height={36}></Image>
        <p>John Doe</p>
        <Image src={"ic_caretdown.svg"} alt="upArrow" width={24} height={24}></Image>
      </div>
    </div>
  );
};

export default AdminHeaderBar;
