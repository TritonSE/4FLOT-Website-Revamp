"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getPageText } from "../../../api/pageeditor";
import Button from "../../../components/Button";
import ValueCard from "../../../components/ValueCard";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import BackgroundHeader from "@/components/BackgroundHeader";

export default function Mission() {
  const [images, setImages] = useState<BackgroundImage[]>([]);

  const [valueSubtitle, setvalueSubtitle] = useState<string>("");
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [Value1, setValue1] = useState<string>("");
  const [Value1_Description, setValue1_Description] = useState<string>("");
  const [Value2, setValue2] = useState<string>("");
  const [Value2_Description, setValue2_Description] = useState<string>("");
  const [Value3, setValue3] = useState<string>("");
  const [Value3_Description, setValue3_Description] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");

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

  let pageText;
  useEffect(() => {
    getPageText("Our Mission")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setvalueSubtitle(pageText.pageSections[1].subtitle ?? "");
          setValue1(pageText.pageSections[2].sectionTitle ?? "");
          setValue1_Description(pageText.pageSections[2].sectionSubtitle ?? "");
          setValue2(pageText.pageSections[3].sectionTitle ?? "");
          setValue2_Description(pageText.pageSections[3].sectionSubtitle ?? "");
          setValue3(pageText.pageSections[4].sectionTitle ?? "");
          setValue3_Description(pageText.pageSections[4].sectionSubtitle ?? "");
          setS1Subtitle(pageText.pageSections[5].sectionTitle ?? "");
          setS1Text(pageText.pageSections[5].sectionSubtitle ?? "");
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
        header="OUR MISSION"
        title="Why We Do It"
        description={phSubtitle}
      />

      <div className={styles.page}>
        {/* We pay it forward*/}
        <div className={styles.text}>
          <div className={styles.titlelarge}>{valueSubtitle}</div>
          <div className={styles.rectangleContainer}>
            <ValueCard
              title={Value1}
              iconSrc="/threepeople.svg"
              description={Value1_Description}
            ></ValueCard>
            <ValueCard
              title={Value2}
              iconSrc="/handheart.svg"
              description={Value2_Description}
            ></ValueCard>
            <ValueCard
              title={Value3}
              iconSrc="/puzzle.svg"
              description={Value3_Description}
            ></ValueCard>
          </div>
        </div>

        {/* OUR STORY*/}
        <div className={styles.storyContainer}>
          <div className={styles.storyText}>
            <div className={styles.titlelarge}>{s1Subtitle}</div>
            <p className={styles.description}>{s1Text}</p>
            <Button text="Meet Our Team" link="/team"></Button>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageContainerTopRow}>
              <div className={styles.topLeft}>
                <Image
                  className={styles.image}
                  src={"/mission_top_left.png"}
                  alt="Story image 1"
                  width="234"
                  height="195"
                />
              </div>

              <div className={styles.topRight}>
                <Image
                  className={styles.image}
                  src={"/mission_top_right.png"}
                  alt="Story image 2"
                  width="266"
                  height="285"
                />
              </div>
            </div>
            <div className={styles.bottom}>
              <Image
                className={styles.image}
                src={"/mission_bottom.png"}
                alt="Story image 3"
                width="532"
                height="298"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
