"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import Button from "./Button";
import styles from "./HeaderBar.module.css";

const HeaderBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.headerBar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/Color=Default.svg"
            alt="Default Logo"
            width={196}
            height={70}
            className={styles.logo}
            style={{ objectFit: "fill" }}
          />
        </Link>
      </div>

      <div className={styles.menu}>
        <button className={`${styles.menuBtn} ${menuOpen ? styles.open : ""}`} onClick={toggleMenu}>
          <Image
            src="/nav_menu.svg"
            alt="Menu"
            width={31}
            height={31}
            className={styles.menuIcon}
            style={{ objectFit: "fill" }}
          />
        </button>
      </div>

      <div className={`${styles.tabs} ${!menuOpen ? styles.show : ""}`}>
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
              <Link href="/upcoming-events">Upcoming Events</Link>
              <Link href="/past-events">Past Events</Link>
              <Link href="/donations">Donate</Link>
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

          <Button text={"Donate"} link={"/donations"} />
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
