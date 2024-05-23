"use client";
import React, { useEffect, useState } from "react";

import { getPageText } from "../../../api/pageeditor";
import NewsletterArchive from "../../../components/NewsletterArchive";
import NewsletterCard from "../../../components/NewsletterCard";
import NewsletterPopup from "../../../components/NewsletterPopup";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import { Newsletter, getAllNewsletters } from "@/api/newsletter";
import BackgroundHeader from "@/components/BackgroundHeader";
import Button from "@/components/Button";

export default function NewsletterPage() {
  const [popupOpen, setPopup] = useState(false);
  const [images, setImages] = useState<BackgroundImage[]>([]);
  const [curNewsletters, setCurNewsletters] = useState<Newsletter[]>([]);
  const [archiveNewsletters, setArchiveNewsletters] = useState<Record<string, Newsletter[]>>({});
  const [sortedArchives, setSortedArchives] = useState<string[]>([]);

  //admin variables
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");

  useEffect(() => {
    getBackgroundImages(BackgroundImagePages.TEAM)
      .then((result) => {
        if (result.success) {
          setImages(result.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
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
  }, []);

  const handleSubscribeClick = () => {
    setPopup(true);
  };

  let pageText;
  useEffect(() => {
    getPageText("Newsletter")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
        } else {
          alert(response.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <main>
      <BackgroundHeader
        backgroundImageURIs={images.map((image) => image.imageURI)}
        header="OUR IMPACT"
        title="Newsletter"
        description={phSubtitle}
      />
      <div className={styles.text}>
        <div className={styles.subtitle}>{s1Subtitle}</div>
        <div className={styles.containerCardsAndText}>
          <div className={styles.description}>{s1Text}</div>
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
