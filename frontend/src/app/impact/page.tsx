import React from "react";

import styles from "./page.module.css";

import BackgroundHeader from "@/components/BackgroundHeader";
import WhiteCard from "@/components/WhiteCard";

export default function Impact() {
  return (
    <main className={styles.page}>
      <div className={styles.backgroundImageContainer}>
        <BackgroundHeader
          backgroundImage="/ourimpact.svg"
          header=""
          title="Our Impact"
          description="4FLOT is committed in preventing and ending homelessness, hunger and disparity in underprivileged communities."
        />
      </div>
      <div className={styles.cardsBackground}></div>
      <div className={styles.whiteCardsContainer}>
        <div className={styles.cards}>
          <WhiteCard
            imageUrl="/testimonials.svg"
            buttonUrl="/"
            buttonText="Learn More"
            title="Testimonals"
            description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
          />
          <WhiteCard
            imageUrl="/newsletter.svg"
            buttonUrl="/"
            buttonText="Learn More"
            title="Newsletter"
            description="Your support and contributions will enable us to meet our goals and improve conditions. Your generous donation will fund our mission."
          />
        </div>
      </div>
    </main>
  );
}
