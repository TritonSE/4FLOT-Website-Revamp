"use client";

import React, { useEffect, useState } from "react";

import { getPageData } from "../../api/pageeditor";
import BackgroundHeader from "../../components/BackgroundHeader";
import Button from "../../components/Button";
import Description from "../../components/Description";
import EventsList from "../../components/EventsList";
import WhiteCard from "../../components/WhiteCard";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import { generatePageMap } from "../admin/util/pageeditUtil";

import styles from "./page.module.css";
import "../globals.css";

export default function Home() {
  const [pageMap, setPageMap] = useState<Map<string, string | string[]>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPageData("home")
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
      <BackgroundHeader
        backgroundImageURIs={pageMap.get("Header Image Carousel") as string[]}
        header={""}
        title={"4 Future Leaders of Tomorrow"}
        description={pageMap.get("Subtitle") as string}
        button={<Button text="Learn More" link="/about" />}
      />
      <div className={styles.whiteCardsContainer}>
        <WhiteCard
          imageUrl="/Donate.svg"
          buttonUrl="/donations"
          buttonText="Donate"
          title="Help Our Cause"
          description="Your support and contributions will enable us to meet our goals and improve conditions. 
            Your generous donation will fund our mission."
        />
      </div>
      <div className={styles.container}>
        <Description
          title={pageMap.get("Events Section Title") as string}
          description={pageMap.get("Events Body Text") as string}
        />
        <div className={styles.eventsListContainer}>
          <EventsList page="home" />
        </div>

        <div className={styles.buttonContainer}>
          <Button text="See More" link={"/upcoming-events"} />
        </div>
        <Description
          title={pageMap.get("Sponsors Section Title") as string}
          description={pageMap.get("Sponsors Body Text") as string}
        />
        <div className="flex items-center justify-center w-full h-auto">
          <div className="flex flex-wrap justify-evenly gap-8 w-3/5 h-auto">
            {(pageMap.get("Sponsor Image Gallery") as string[]).map((url) => (
              <div key={url.split("&token=")[1]}>
                <img src={url} alt="sponsor" className="h-auto w-auto max-h-16 max-w-auto" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button text="Sponsor Us" link={"/contact"} />
        </div>
      </div>
    </main>
  );
}
