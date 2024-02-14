import Image from "next/image";
import React from "react";

import BackgroundHeader from "../../components/BackgroundHeader";
import Button from "../../components/Button";

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

      {/* We pay it forward*/}
      <div className={styles.text}>
        <div className={styles.titlelarge}>We Pay It Forward With...</div>
        <div className={styles.rectangleContainer}>
          <div className={styles.customRectangle}>
            <div className={styles.circleWhite}>
              <img src="/threepeople.png" alt="Image 1" className={styles.centeredImage} />
            </div>
            <div className={styles.RectangleTitle}>Service</div>
            <div className={styles.BodytextInsideRectangle}>
              Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec
              blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.
            </div>
          </div>
          <div className={styles.customRectangle}>
            <div className={styles.circleWhite}>
              <img src="/handheart.png" alt="Image 2" className={styles.centeredImage} />
            </div>
            <div className={styles.RectangleTitle}>Compassion</div>
            <div className={styles.BodytextInsideRectangle}>
              Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec
              blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.
            </div>
          </div>
          <div className={styles.customRectangle}>
            <div className={styles.circleWhite}>
              <img src="/puzzle.png" alt="Image 3" className={styles.centeredImage} />
            </div>
            <div className={styles.RectangleTitle}>Community</div>
            <div className={styles.BodytextInsideRectangle}>
              Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec
              blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.
            </div>
          </div>
        </div>
      </div>

      {/* OUR STORY*/}
      <div className={styles.text}>
        <div className={styles.titlelarge}>Here&apos;s Our Story</div>
        <p className={styles.description}>
          At one point or another, each of the founding members have gone through personal
          struggles, some have experienced homelessness, hunger, medical illnesses and others
          juggled single parenting, while furthering their education, and so on. However, the common
          denominator was that each of us needed Help. So now we are &quot;The Helpers&quot; 4
          Future Leaders of Tomorrow -because the people we help are our future.
        </p>
        <Button text="Meet Our Team" link="/team"></Button>
      </div>
      <div className={styles.imageContainer}>
        <Image src={"/mission_top_left.png"} alt="Story image 1" width="234" height="195" />
        <Image src={"/mission_top_right.png"} alt="Story image 2" width="266" height="285" />
        <Image src={"/mission_bottom.png"} alt="Story image 3" width="532" height="298" />
      </div>
    </main>
  );
}
