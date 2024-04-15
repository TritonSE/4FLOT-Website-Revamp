// Admin Dashboard landing page
import DashboardCard from "@/components/DashboardCard";

import styles from "./page.module.css";

export default function Dashboard() {
  return (
    <main className={styles.page}>
      <div className={styles.gridContainer}>
        <DashboardCard
          imageURI="/dashboard_eventcreator.png"
          url="/eventcreator"
          title="Event Creator"
          last_updated="Month XX, XXXX, XX:XX"
        />
        <DashboardCard
          imageURI="/dashboard_pageeditor.png"
          url="/pageeditor"
          title="Page Editor"
          last_updated="Month XX, XXXX, XX:XX"
        />

        <DashboardCard
          imageURI="/dashboard_newsletter.png"
          url="/newslettercreator"
          title="Newsletter"
          last_updated="Month XX, XXXX, XX:XX"
        />

        <DashboardCard
          imageURI="/dashboard_mailinglist.png"
          url="/mailinglist"
          title="Mailing List"
          last_updated="Month XX, XXXX, XX:XX"
        />
      </div>
    </main>
  );
}
