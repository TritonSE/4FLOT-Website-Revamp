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
      <div className={styles.text}>
        <div className={styles.subtitle}>We Pay It Forward With...</div>
      </div>

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
