"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const [activeMenu, setActiveMenu] = useState<string>();

  const handleOnClick = (menuDiv: string) => {
    setActiveMenu(menuDiv);
  };
  return (
    <div className={styles.navBar}>
      <Image
        width={168.25}
        height={59.69}
        src="footerLogo.svg"
        alt="4 Future Leaders of Tomorrow Logo"
      />
      <div className={styles.menu}>
        <div className={activeMenu === "dashboard" ? styles.menuActive : styles.menuDiv}>
          <Image width={18} height={18} src="dashboardIcon.svg" alt="Dashboard Icon" />
          <Link
            href="/admin/dashboard"
            onClick={() => {
              handleOnClick("dashboard");
            }}
          >
            Dashboard
          </Link>
        </div>
        <div className={activeMenu === "eventCreator" ? styles.menuActive : styles.menuDiv}>
          <Image width={18} height={18} src="calendarIcon.svg" alt="Calendar Icon" />
          <Link
            href="#"
            onClick={() => {
              handleOnClick("eventCreator");
            }}
          >
            Event Creator
          </Link>
        </div>
        <div className={activeMenu === "pageeditor" ? styles.menuActive : styles.menuDiv}>
          <Image width={18} height={18} src="pageIcon.svg" alt="Page Icon" />
          <Link
            href="/admin/pageeditor"
            onClick={() => {
              handleOnClick("pageeditor");
            }}
          >
            Page Editor
          </Link>
        </div>
        <div className={activeMenu === "newsletter" ? styles.menuActive : styles.menuDiv}>
          <Image width={18} height={18} src="newsletterIcon.svg" alt="Newsletter Icon" />
          <Link
            href="#"
            onClick={() => {
              handleOnClick("newsletter");
            }}
          >
            Newsletter Creator
          </Link>
        </div>
        <div className={activeMenu === "mailingList" ? styles.menuActive : styles.menuDiv}>
          <Image width={18} height={18} src="mailIcon.svg" alt="Mail Icon" />
          <Link
            href="#"
            onClick={() => {
              handleOnClick("mailingList");
            }}
          >
            Mailing List
          </Link>
        </div>
        <div className={activeMenu === "settings" ? styles.menuActive : styles.menuDiv}>
          <Image width={18} height={18} src="settingsIcon.svg" alt="Settings Icon" />
          <Link
            href="#"
            onClick={() => {
              handleOnClick("settings");
            }}
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
