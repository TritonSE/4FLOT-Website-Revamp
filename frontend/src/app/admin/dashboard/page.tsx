"use client";

import styles from "./page.module.css";

import DashboardCard from "@/components/DashboardCard";
import PrivatePage from "@/components/admin/PrivatePage";

export default function Dashboard() {
  return (
    <PrivatePage>
      <main className={styles.page}>
        <div className={styles.gridContainer}>
          <DashboardCard
            imageURI="/dashboard_eventcreator.png"
            url="/event-creator"
            title="Event Creator"
            last_updated="Month XX, XXXX, XX:XX"
          />
          <DashboardCard
            imageURI="/dashboard_pageeditor.png"
            url="/page-editor"
            title="Page Editor"
            last_updated="Month XX, XXXX, XX:XX"
          />
          <DashboardCard
            imageURI="/dashboard_newsletter.png"
            url="/newsletter-creator"
            title="Newsletter"
            last_updated="Month XX, XXXX, XX:XX"
          />
          <DashboardCard
            imageURI="/dashboard_mailinglist.png"
            url="/mailing-list"
            title="Mailing List"
            last_updated="Month XX, XXXX, XX:XX"
          />
        </div>
      </main>
    </PrivatePage>
  );
}
