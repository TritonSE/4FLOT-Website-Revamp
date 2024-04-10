"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const [activeMenu, setActiveMenu] = useState();

  return (
    <div className={styles.navBar}>
      <Image
        width={168.25}
        height={59.69}
        src="footerLogo.svg"
        alt="4 Future Leaders of Tomorrow Logo"
      />
      <div className={styles.menu}>
        <div>
          <Image width={18} height={18} src="dashboardIcon.svg" alt="Dashboard Icon" />
          <Link href="/admin/dashboard">
            Dashboard
            {/* className={activeMenu === "dashboard" ? "active nav-link" : "nav-link"}
            onClick=
            {() => {
              setActiveMenu("dashboard");
            }} */}
          </Link>
        </div>
        <div>
          <Image width={18} height={18} src="calendarIcon.svg" alt="Calendar Icon" />
          <Link href="#">Event Creator</Link>
        </div>
        <div>
          <Image width={18} height={18} src="pageIcon.svg" alt="Page Icon" />
          <Link href="/admin/pageeditor">Page Editor</Link>
        </div>
        <div>
          <Image width={18} height={18} src="newsletterIcon.svg" alt="Newsletter Icon" />
          <Link href="#">Newsletter Creator</Link>
        </div>
        <div>
          <Image width={18} height={18} src="mailIcon.svg" alt="Mail Icon" />
          <Link href="#">Mailing List</Link>
        </div>
        <div>
          <Image width={18} height={18} src="settingsIcon.svg" alt="Settings Icon" />
          <Link href="#">Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
