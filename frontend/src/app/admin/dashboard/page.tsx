"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

import DashboardCard from "@/components/DashboardCard";
import { getRecord } from "@/api/records";

export default function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState<Record<string, string>>({});

  useEffect(() => {
    const cards = ["event-creator", "page-editor", "mailing-list", "newsletter-creator"];
    for (const card of cards) {
      try {
        getRecord(card)
          .then((record) => {
            if (record.success) {
              setLastUpdated((prevLastUpdated) => ({
                ...prevLastUpdated,
                [card]: record.data.date,
              }));
            } else {
              alert(record.error);
            }
          })
          .catch((error) => {
            alert(error);
          });
      } catch (error) {
        console.error(`Error fetching last updated date for ${card}:`, error);
      }
    }
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.gridContainer}>
        <DashboardCard
          imageURI="/dashboard_eventcreator.png"
          url="/event-creator"
          title="Event Creator"
          last_updated={lastUpdated["event-creator"] ?? ""}
        />
        <DashboardCard
          imageURI="/dashboard_pageeditor.png"
          url="/page-editor"
          title="Page Editor"
          last_updated={lastUpdated["page-editor"] ?? ""}
        />
        <DashboardCard
          imageURI="/dashboard_newsletter.png"
          url="/newsletter-creator"
          title="Newsletter"
          last_updated={lastUpdated["newsletter-creator"] ?? ""}
        />
        <DashboardCard
          imageURI="/dashboard_mailinglist.png"
          url="/mailing-list"
          title="Mailing List"
          last_updated={lastUpdated["mailing-list"] ?? ""}
        />
      </div>
    </main>
  );
}
