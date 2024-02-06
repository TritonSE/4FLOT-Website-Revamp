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
            <a href="#">Our Mission</a>
            <a href="#">Our Team</a>
            <a href="#">Contact</a>
          </div>
        </div>

        {/* Use the dropdown styles for "get Involved" */}
        <div className={styles.getInvolved}>
          Get Involved
          <div className={styles.getInvolvedDropdown}>
            <a href="#">Upcoming Events</a>
            <a href="#">Donate</a>
          </div>
        </div>

        {/* Use the dropdown styles for "Our Impact" */}
        <div className={styles.ourImpact}>
          Our Impact
          <div className={styles.ourImpactDropdown}>
            <a href="#">Testimonials</a>
            <a href="#">Newsletter</a>
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
