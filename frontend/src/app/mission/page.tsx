import React from "react";

import BackgroundHeader from "../components/BackgroundHeader";

import styles from "./page.module.css";

export default function Mission() {
  return (
    <main>
      <BackgroundHeader
        backgroundImage="/mission_background.png"
        header="Our Mission"
        title="Why We Do It"
        description="Leading the way for generations to come! Together we can .... make a difference by paying it forward with Love, Compassion, and Community Outreach for all humanity."
      />
    </main>
  );
}
