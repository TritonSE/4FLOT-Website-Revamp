"use client";

import React, { useEffect, useState } from "react";

import { Newsletter, getAllNewsletters } from "../../../api/newsletter";
import { getPageData } from "../../../api/pageeditor";
import BackgroundHeader from "../../../components/BackgroundHeader";
import Button from "../../../components/Button";
import NewsletterArchive from "../../../components/NewsletterArchive";
import NewsletterCard from "../../../components/NewsletterCard";
import NewsletterPopup from "../../../components/NewsletterPopup";
import LoadingSpinner from "../../../components/admin/LoadingSpinner";
import { generatePageMap } from "../../admin/util/pageeditUtil";

import styles from "./page.module.css";

export default function NewsletterPage() {
  const [popupOpen, setPopup] = useState(false);
  const [curNewsletters, setCurNewsletters] = useState<Newsletter[]>([]);
  const [archiveNewsletters, setArchiveNewsletters] = useState<Record<string, Newsletter[]>>({});
  const [sortedArchives, setSortedArchives] = useState<string[]>([]);

  // admin variables
  const [pageMap, setPageMap] = useState<Map<string, string | string[]>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadNewspapers();
    loadPageMap();
    setLoading(false);
  }, []);

  function loadPageMap() {
    getPageData("newsletter")
      .then((response) => {
        if (response.success) setPageMap(generatePageMap(response.data));
        else throw new Error(response.error);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function loadNewspapers() {
    getAllNewsletters()
      .then((response) => {
        if (response.success) {
          const currentYear = new Date().getFullYear();

          const curLetters = response.data.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate.getFullYear() === currentYear;
          });
          setCurNewsletters(curLetters);

          const archiveLetters = response.data.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate.getFullYear() < currentYear;
          });
          const newslettersByYear: Record<string, Newsletter[]> = {};

          archiveLetters.forEach((newsletter) => {
            const year = new Date(newsletter.date).getFullYear().toString();
            if (!newslettersByYear[year]) {
              newslettersByYear[year] = [];
            }
            newslettersByYear[year].push(newsletter);
          });
          setArchiveNewsletters(newslettersByYear);

          const sortedLetters = Object.keys(newslettersByYear).sort(
            (a, b) => parseInt(b) - parseInt(a),
          );
          setSortedArchives(sortedLetters);
        } else {
          alert(response.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  const handleSubscribeClick = () => {
    setPopup(true);
  };

  if (loading || !pageMap) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <BackgroundHeader
        backgroundImageURIs={pageMap.get("Header Image Carousel") as string[]}
        header="OUR IMPACT"
        title="Newsletter"
        description={pageMap.get("Subtitle") as string}
      />
      <div className={styles.text}>
        <div className={styles.subtitle}>{pageMap.get("Section Title") as string}</div>
        <div className={styles.containerCardsAndText}>
          <div className={styles.description}>{pageMap.get("Section Subtitle") as string}</div>
          <Button text="Subscribe for Updates" onClick={handleSubscribeClick} />
        </div>
        <div className={styles.popup}>
          <NewsletterPopup open={popupOpen} setOpen={setPopup} />
        </div>
      </div>

      <div className={styles.page}>
        <div className={styles.newslettersDisplay}>
          {curNewsletters.length === 0 ? (
            <p>Loading...</p>
          ) : (
            curNewsletters.map((newsletter: Newsletter) => (
              <NewsletterCard key={newsletter._id} newsletter={newsletter} />
            ))
          )}
        </div>
        <div className={styles.archiveContainer}>
          <div className={styles.titlelarge}>Archive</div>
          {sortedArchives.map((year) => (
            <NewsletterArchive key={year} year={year} newsletters={archiveNewsletters[year]} />
          ))}
        </div>
      </div>
    </main>
  );
}
