"use client";
import "./globals.css";
import styles from "./page.module.css";
import BackgroundHeader from "@/components/BackgroundHeader";
import WhiteCard from "@/components/WhiteCard";
import Description from "@/components/Description";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const see_more_text = "See More";
  const sponsor_us_text = "Sponsor Us";
  return (
    <main className={styles.page}>
      <div className={styles.backgroundImageContainer}>
        <BackgroundHeader
          backgroundImage="/ourimpact.svg"
          header=""
          title="4 Future Leaders of Tomorrow"
          description="4FLOT is committed in preventing and ending homelessness, hunger and disparity in underprivileged communities. "
        />
      </div>
      <div className={styles.whiteCardsContainer}>
        <WhiteCard
          imageUrl="/Donate.svg"
          buttonUrl="/"
          buttonText="Donate"
          title="Help Our Cause"
          description="Your support and contributions will enable us to meet our goals and improve conditions. 
            Your generous donation will fund our mission."
        />
      </div>
      <div className={styles.container}>
        <Description
          title="Get Involved at our Upcoming Events"
          description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
        />
        <div className={styles.buttonContainer}>
          <Link href="#" className={styles.buttonText}>
            {see_more_text}
          </Link>
        </div>
        <Description
          title="Our Community Sponsors"
          description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
        />
        <img className={styles.sponsor_image} src="/Sponsors.svg" alt="Sponsors" />
        <div className={styles.buttonContainer}>
          <Link href="#" className={styles.buttonText}>
            {sponsor_us_text}
          </Link>
        </div>
      </div>
    </main>
  );
}
