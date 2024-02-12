import Link from "next/link";
import React from "react";

import styles from "./HeaderBar.module.css";

export const HeaderBar = () => {
  return (
    <div className={styles.headerBar}>
      <div className={styles.logo}>
        <img className={styles.logo} src="/Color=Default.svg" alt="Default Logo"></img>
      </div>
      <div className={styles.txtContainer}>
        {/* Use the dropdown styles for "About Us" */}
        <div className={styles.aboutUs}>
          About Us
          <div className={styles.aboutUsDropdown}>
            <Link href="/">Our Mission</Link>
            <Link href="/">Our Team</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>

        {/* Use the dropdown styles for "get Involved" */}
        <div className={styles.getInvolved}>
          Get Involved
          <div className={styles.getInvolvedDropdown}>
            <Link href="/">Upcoming Events</Link>
            <Link href="/">Donate</Link>
          </div>
        </div>

        {/* Use the dropdown styles for "Our Impact" */}
        <div className={styles.ourImpact}>
          Our Impact
          <div className={styles.ourImpactDropdown}>
            <Link href="/">Testimonials</Link>
            <Link href="/">Newsletter</Link>
          </div>
        </div>

        <div className={styles.button}>
          <button>
            <span className={styles.buttonBody}>Donate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
