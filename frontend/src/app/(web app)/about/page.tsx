"use client";

import React, { useEffect, useState } from "react";

import { getPageData } from "../../../api/pageeditor";
import AboutCard from "../../../components/AboutCard";
import BackgroundHeader from "../../../components/BackgroundHeader";
import LoadingSpinner from "../../../components/admin/LoadingSpinner";
import { generatePageMap } from "../../admin/util/pageeditUtil";

import styles from "./page.module.css";

export default function AboutPage() {
  const [pageMap, setPageMap] = useState<Map<string, string | string[]>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPageData("about")
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
    <main className={styles.page}>
      <div className={styles.backgroundImageContainer}>
        <BackgroundHeader
          backgroundImageURIs={pageMap.get("Header Image Carousel") as string[]}
          header=""
          title="About Us"
          description={pageMap.get("Subtitle") as string}
        />
      </div>
      <div className={styles.cards}>
        <AboutCard
          ourText="Our Mission"
          imageUrl={pageMap.get("Mission Section Image") as string}
          buttonUrl="/mission"
          buttonText="Learn More"
          title={pageMap.get("Mission Section Title") as string}
          description={pageMap.get("Mission Body Text") as string}
          contentSide="right"
        />
        <AboutCard
          ourText="Our Team"
          imageUrl={pageMap.get("Team Section Image") as string}
          buttonUrl="/team"
          buttonText="Read More"
          title={pageMap.get("Team Section Title") as string}
          description={pageMap.get("Team Body Text") as string}
          contentSide="left"
        />
        <AboutCard
          ourText="Contact Us"
          imageUrl={pageMap.get("Contact Section Image") as string}
          buttonUrl="/contact"
          buttonText="Contact Us"
          title={pageMap.get("Contact Section Title") as string}
          description={pageMap.get("Contact Body Text") as string}
          contentSide="right"
        />
      </div>
    </main>
  );
}
