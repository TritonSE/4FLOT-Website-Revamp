// Admin Dashboard landing page
import DashboardCard from "@/components/DashboardCard";

import styles from "./page.module.css";

export default function Dashboard() {
    
    return (
      <main className={styles.page}>
          <div className={styles.cards}>
            <DashboardCard
              imageURI="/dashboard_eventcreator.png"
              url="/admin/eventcreator"
              title="Event Creator"
              last_updated="Month XX, XXXX, XX:XX"
            />
            <DashboardCard
              imageURI="/dashboard_pageeditor.png"
              url="/admin/pageeditor"
              title="Page Editor"
              last_updated="Month XX, XXXX, XX:XX"
            />
            <DashboardCard
              imageURI="/dashboard_newsletter.png"
              url="/admin/newsletter"
              title="Newsletter"
              last_updated="Month XX, XXXX, XX:XX"
            />
            <DashboardCard
              imageURI="/dashboard_mailinglist.png"
              url="/admin/mailinglist"
              title="Mailing List"
              last_updated="Month XX, XXXX, XX:XX"
            />
            
          </div>
      </main>
    );
  }
  