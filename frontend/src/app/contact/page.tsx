import Image from "next/image";
import React from "react";

import Button from "../../components/Button";

import styles from "./page.module.css";

export default function Contact() {
  return (
    <main>
      <div className={styles.page}>
        {/*Reach Out To Us */}
        <div className={styles.text}>
          <div className={styles.title}>Reach Out To Us</div>
          <p className={styles.description}>
            There are many ways to join us and support our mission. Contact us to find out more
            about volunteering opportunities, fundraising, and more !
          </p>
        </div>

        {/* Stay Connected*/}
        <div className={styles.title}>Stay Connected</div>

        <Image src={"/stayConnected.svg"} alt="Stay Connected Image" width="456" height="467" />
        <Button text="Contact Us" link=""></Button>
      </div>
    </main>
  );
}
