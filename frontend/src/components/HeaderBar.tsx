import Link from "next/link";
import React from "react";

import Button from "./Button";
import styles from "./HeaderBar.module.css";

const HeaderBar = () => {
  return (
    <div className={styles.headerBar}>
      {/* <div className={styles.contentContainer}> */}
      <div className={styles.logo}>
        <Link href="/">
          <img className={styles.logo} src="/Color=Default.svg" alt="Default Logo"></img>
        </Link>
      </div>

      <div className={styles.txtContainer}>
        {/* Use the dropdown styles for "About Us" */}
        <div className={styles.aboutUs}>
          <Link href="/about">About Us</Link>
          <div className={styles.aboutUsDropdown}>
            <Link href="/mission">Our Mission</Link>
            <Link href="/team">Our Team</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        {/* Use the dropdown styles for "get Involved" */}
        <div className={styles.getInvolved}>
          <Link href="/involved">Get Involved</Link>
          <div className={styles.getInvolvedDropdown}>
            <Link href="/events">Upcoming Events</Link>
            <Link href="/donate">Donate</Link>
          </div>
        </div>

        {/* Use the dropdown styles for "Our Impact" */}
        <div className={styles.ourImpact}>
          <Link href="/impact">Our Impact</Link>
          <div className={styles.ourImpactDropdown}>
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/newsletter">Newsletter</Link>
          </div>
        </div>

        <Button text={"Donate"} link={"/"} />
      </div>
      {/* </div> */}
    </div>
  );
};

export default HeaderBar;
