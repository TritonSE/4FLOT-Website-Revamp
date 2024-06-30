"use client";

import React, { useEffect, useState } from "react";

import { getPageData } from "../../../api/pageeditor";
import BackgroundHeader from "../../../components/BackgroundHeader";
import Button from "../../../components/Button";
import ValueCard from "../../../components/ValueCard";
import LoadingSpinner from "../../../components/admin/LoadingSpinner";
import { generatePageMap } from "../../admin/util/pageeditUtil";

import styles from "./page.module.css";

export default function Mission() {
  const [pageMap, setPageMap] = useState<Map<string, string | string[]>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPageData("mission")
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
  console.log((pageMap.get("Image Gallery") as string[])[0]);

  return (
    <main>
      <BackgroundHeader
        backgroundImageURIs={pageMap.get("Header Image Carousel") as string[]}
        header="OUR MISSION"
        title="Why We Do It"
        description={pageMap.get("Subtitle") as string}
      />

      <div className={styles.page}>
        {/* We pay it forward*/}
        <div className={styles.text}>
          <div className={styles.titlelarge}>{pageMap.get("Values Section Title") as string}</div>
          <div className={styles.rectangleContainer}>
            <ValueCard
              title={pageMap.get("Value #1") as string}
              iconSrc="/threepeople.svg"
              description={pageMap.get("Value #1 Description") as string}
            ></ValueCard>
            <ValueCard
              title={pageMap.get("Value #2") as string}
              iconSrc="/handheart.svg"
              description={pageMap.get("Value #2 Description") as string}
            ></ValueCard>
            <ValueCard
              title={pageMap.get("Value #3") as string}
              iconSrc="/puzzle.svg"
              description={pageMap.get("Value #3 Description") as string}
            ></ValueCard>
          </div>
        </div>

        {/* OUR STORY*/}
        <div className={styles.storyContainer}>
          <div className={styles.storyText}>
            <div className={styles.titlelarge}>{pageMap.get("Story Section Title") as string}</div>
            <p className={styles.description}>{pageMap.get("Body Text") as string}</p>
            <Button text="Meet Our Team" link="/team"></Button>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageContainerTopRow}>
              <div
                style={{
                  backgroundImage: `url(${(pageMap.get("Image Gallery") as string[])[0]})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-[234px] h-[165px] rounded-xl"
              />
              <div
                style={{
                  backgroundImage: `url(${(pageMap.get("Image Gallery") as string[])[1]})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-[266px] h-[250px] rounded-xl"
              />
            </div>
            <div
              style={{
                backgroundImage: `url(${(pageMap.get("Image Gallery") as string[])[2]})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              className="w-[532px] h-[298px] rounded-xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
