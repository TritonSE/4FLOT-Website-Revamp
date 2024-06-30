"use client";

import React, { useEffect, useState } from "react";

import { getPageData } from "../../../api/pageeditor";
import { generatePageMap } from "../../../app/admin/util/pageeditUtil";
import BackgroundHeader from "../../../components/BackgroundHeader";
import WhiteCard from "../../../components/WhiteCard";
import LoadingSpinner from "../../../components/admin/LoadingSpinner";

import styles from "./page.module.css";

export default function Impact() {
  const [pageMap, setPageMap] = useState<Map<string, string | string[]>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPageData("impact")
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
          title="Our Impact"
          description={pageMap.get("Subtitle") as string}
        />
      </div>
      <div className={styles.cardsBackground}></div>
      <div className={styles.whiteCardsContainer}>
        <div className={styles.cards}>
          <WhiteCard
            imageUrl="/testimonials.svg"
            buttonUrl="/testimonials"
            buttonText="Learn More"
            title="Testimonals"
            description={pageMap.get("Testimonials Subtitle") as string}
          />
          <WhiteCard
            imageUrl="/newsletter.svg"
            buttonUrl="/newsletter"
            buttonText="Learn More"
            title="Newsletter"
            description={pageMap.get("Newsletter Subtitle") as string}
          />
        </div>
      </div>
    </main>
  );
}
