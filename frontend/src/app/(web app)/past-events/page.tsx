"use client";

import React, { useEffect, useState } from "react";

import { getPageData } from "../../../api/pageeditor";
import { generatePageMap } from "../../../app/admin/util/pageeditUtil";
import BackgroundHeader from "../../../components/BackgroundHeader";
import EventsList from "../../../components/EventsList";
import LoadingSpinner from "../../../components/admin/LoadingSpinner";

import styles from "./page.module.css";

export default function UpcomingEvents() {
  const [pageMap, setPageMap] = useState<Map<string, string | string[]>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPageData("past-events")
      .then((response) => {
        if (response.success) setPageMap(generatePageMap(response.data));
        else throw new Error(response.error);
      })
      .catch((error) => {
        alert(error);
      });
    setLoading(false);
  }, []);

  if (loading || !pageMap) {
    return <LoadingSpinner />;
  }

  return (
    <div className="items-center justify-center">
      <BackgroundHeader
        backgroundImageURIs={pageMap.get("Header Image Carousel") as string[]}
        header="GET INVOLVED"
        title="Past Events"
        description={pageMap.get("Subtitle") as string}
      />

      <div className={styles.body}>
        <div className={styles.bodyTitle}>
          <h1 style={{ font: "var(--font-title-l)" }}>{pageMap.get("Section Title") as string}</h1>
          <p style={{ font: "var(--font-body-reg)" }}>
            {pageMap.get("Section Subtitle") as string}
          </p>
        </div>
        <EventsList page="past-events" />
      </div>
    </div>
  );
}
