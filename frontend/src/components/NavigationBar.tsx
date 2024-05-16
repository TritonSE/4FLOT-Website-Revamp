"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import styles from "./NavigationBar.module.css";
import UserIcon from "./UserIcon";

const NavigationBar = () => {
  const [activeMenu, setActiveMenu] = useState<string>("Dashboard");

  /**
   * Upon page load, display correct text for navigation bar
   * depending on website url
   */
  useEffect(() => {
    const handleLoad = () => {
      if (typeof window !== "undefined") {
        if (window.location.pathname === "/admin/dashboard") {
          return "Dashboard";
        } else if (window.location.pathname === "/admin/event-creator") {
          return "Event Creator";
        } else if (window.location.pathname === "/admin/page-editor") {
          return "Page Editor";
        } else if (window.location.pathname === "/admin/newsletter-creator") {
          return "Newsletter Creator";
        } else if (window.location.pathname === "/admin/mailing-list") {
          return "Mailing List";
        } else if (window.location.pathname === "/admin/settings") {
          return "Settings";
        } else {
          return "";
        }
      } else {
        return "Dashboard";
      }
    };
    setActiveMenu(handleLoad());
  }, []); // Run only once on initial render

  /* Upon clicking purple sidebar to new page, update navigation bar */
  const handleOnClick = (menuDiv: string) => {
    setActiveMenu(menuDiv);
  };
  return (
    <main>
      <div className={styles.headerBar}>
        <div className={styles.title}>
          <p>{activeMenu}</p>
          {activeMenu !== "Dashboard" && (
            <div className={styles.pageDesc}>
              <p>Dashboard &gt;</p>
              <p style={{ font: "var(--font-body-bold)", color: "var(--color-primary-purple)" }}>
                {activeMenu}
              </p>
            </div>
          )}
        </div>
        <div className={styles.user}>
          <UserIcon />
        </div>
      </div>
      <div className={styles.navBar}>
        <Image
          width={168.25}
          height={59.69}
          src="/footerLogo.svg"
          alt="4 Future Leaders of Tomorrow Logo"
        />
        <div className={styles.menu}>
          <div className={activeMenu === "Dashboard" ? styles.menuActive : styles.menuDiv}>
            <Image width={18} height={18} src="/dashboardIcon.svg" alt="Dashboard Icon" />
            <Link
              href="/admin/dashboard"
              onClick={() => {
                handleOnClick("Dashboard");
              }}
            >
              Dashboard
            </Link>
          </div>
          <div className={activeMenu === "Event Creator" ? styles.menuActive : styles.menuDiv}>
            <Image width={18} height={18} src="/calendarIcon.svg" alt="Calendar Icon" />
            <Link
              href="/admin/event-creator"
              onClick={() => {
                handleOnClick("Event Creator");
              }}
            >
              Event Creator
            </Link>
          </div>
          <div className={activeMenu === "Page Editor" ? styles.menuActive : styles.menuDiv}>
            <Image width={18} height={18} src="/pageIcon.svg" alt="Page Icon" />
            <Link
              href="/admin/page-editor"
              onClick={() => {
                handleOnClick("Page Editor");
              }}
            >
              Page Editor
            </Link>
          </div>
          <div className={activeMenu === "Newsletter Creator" ? styles.menuActive : styles.menuDiv}>
            <Image width={18} height={18} src="/newsletterIcon.svg" alt="Newsletter Icon" />
            <Link
              href="/admin/newsletter-creator"
              onClick={() => {
                handleOnClick("Newsletter Creator");
              }}
            >
              Newsletter Creator
            </Link>
          </div>
          <div className={activeMenu === "Mailing List" ? styles.menuActive : styles.menuDiv}>
            <Image width={18} height={18} src="/mailIcon.svg" alt="Mail Icon" />
            <Link
              href="/admin/mailing-list"
              onClick={() => {
                handleOnClick("Mailing List");
              }}
            >
              Mailing List
            </Link>
          </div>
          <div className={activeMenu === "Settings" ? styles.menuActive : styles.menuDiv}>
            <Image width={18} height={18} src="/settingsIcon.svg" alt="Settings Icon" />
            <Link
              href="/admin/settings"
              onClick={() => {
                handleOnClick("Settings");
              }}
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NavigationBar;
