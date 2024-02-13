import React from "react";

import BackgroundHeader from "../components/BackgroundHeader";

import styles from "./page.module.css";

export default function Mission() {
  return (
    <main className={styles.page}>
      <BackgroundHeader
        backgroundImage="/mission_background.png"
        header="OUR MISSION"
        title="Why We Do It"
        description="Leading the way for generations to come! Together we can .... make a difference by paying it forward with Love, Compassion, and Community Outreach for all humanity."
      />

      {/* We pay it forward - KEVIN */}
      <div className={styles.text}>
        <div className={styles.titlelarge}>We Pay It Forward With...</div>
        <div className={styles.rectangleContainer}>
          <div className={styles.customRectangle}>
            <div className={styles.circleWhite}>
              <img src="/threepeople.png" alt="Image 1" className={styles.centeredImage} />
            </div>
            <div className={styles.RectangleTitle}>Service</div>
            <div className={styles.BodytextInsideRectangle}>Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.</div>
          </div>
          <div className={styles.customRectangle}>
            <div className={styles.circleWhite}>
              <img src="/handheart.png" alt="Image 2" className={styles.centeredImage} />
            </div>
            <div className={styles.RectangleTitle}>Compassion</div>
            <div className={styles.BodytextInsideRectangle}>Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.</div>
          </div>
          <div className={styles.customRectangle}>
            <div className={styles.circleWhite}>
              <img src="/puzzle.png" alt="Image 3" className={styles.centeredImage} />
            </div>
            <div className={styles.RectangleTitle}>Community</div>
            <div className={styles.BodytextInsideRectangle}>Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.</div>
          </div>
        </div>
      </div>

      {/* OUR STORY - KATELYN */}
      <div className={styles.text}>
        <div className={styles.subtitle}>Here&apos;s Our Story</div>
        <p className={styles.description}>
          At one point or another, each of the founding members have gone through personal
          struggles, some have experienced homelessness, hunger, medical illnesses and others
          juggled single parenting, while furthering their education, and so on. However, the common
          denominator was that each of us needed Help. So now we are &quot;The Helpers&quot; 4
          Future Leaders of Tomorrow -because the people we help are our future.
        </p>
      </div>


    </main>
  );
}
