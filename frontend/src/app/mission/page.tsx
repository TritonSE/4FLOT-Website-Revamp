import Image from "next/image";
import React from "react";

import BackgroundHeader from "../../components/BackgroundHeader";
import Button from "../../components/Button";
import ValueCard from "../../components/ValueCard";

import styles from "./page.module.css";

export default function Mission() {
  return (
    <main>
      <BackgroundHeader
        backgroundImage="/mission_background.png"
        header="OUR MISSION"
        title="Why We Do It"
        description="Leading the way for generations to come! Together we can .... make a difference by paying it forward with Love, Compassion, and Community Outreach for all humanity."
      />

      <div className={styles.page}>
        {/* We pay it forward*/}
        <div className={styles.text}>
          <div className={styles.titlelarge}>We Pay It Forward With...</div>
          <div className={styles.rectangleContainer}>
            <ValueCard
              title="Service"
              iconSrc="/threepeople.svg"
              description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec
              blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
            ></ValueCard>
            <ValueCard
              title="Compassion"
              iconSrc="/handheart.svg"
              description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec
              blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
            ></ValueCard>
            <ValueCard
              title="Community"
              iconSrc="/puzzle.svg"
              description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec
              blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
            ></ValueCard>
          </div>
        </div>

        {/* OUR STORY*/}
        <div className={styles.storyContainer}>
          <div className={styles.storyText}>
            <div className={styles.titlelarge}>Here&apos;s Our Story</div>
            <p className={styles.description}>
              At one point or another, each of the founding members have gone through personal
              struggles, some have experienced homelessness, hunger, medical illnesses and others
              juggled single parenting, while furthering their education, and so on. However, the
              common denominator was that each of us needed Help. So now we are &quot;The
              Helpers&quot; 4 Future Leaders of Tomorrow -because the people we help are our future.
            </p>
            <Button text="Meet Our Team" link="/team"></Button>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageContainerTopRow}>
              <Image src={"/mission_top_left.png"} alt="Story image 1" width="234" height="195" />
              <Image src={"/mission_top_right.png"} alt="Story image 2" width="266" height="285" />
            </div>
            <Image src={"/mission_bottom.png"} alt="Story image 3" width="532" height="298" />
          </div>
        </div>
      </div>
    </main>
  );
}
