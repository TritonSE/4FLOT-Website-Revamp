import Image from "next/image";
import React from "react";

import EventsCard from "./components/events-card";
import styles from "./upcomingEvents.module.css";

export default function UpcomingEvents() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {/* TODO: Replace with carousel component */}
        <div className={styles.imageWrap}>
          <Image
            src="https://cdn.discordapp.com/attachments/974154256061988917/1204523432398688346/placeholderTitleImage.png?ex=65d50add&is=65c295dd&hm=10791e92e54e22ff53a966307bc33ae045306594d2aeb2eff029e052800f6e65&"
            alt="placeholder"
            sizes="(max-height: 25vw)"
            objectFit="cover"
            objectPosition="center"
            fill
          />
        </div>
        <div className={styles.titleText}>
          <p className={styles.bodyMedReg}>GET INVOLVED</p>
          <h1 className={styles.titleXLarge}>Upcoming Events</h1>
          <p className={`${styles.bodyMedReg} max-w-2xl`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptas nemo, ea facilis
            cum repellat libero tempore nulla temporibus officiis quas eaque, asperiores aliquid
            minus soluta nobis excepturi perspiciatis nesciunt.
          </p>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyTitle}>
          <h1 className={styles.titleLarge}>Volunteer With Us</h1>
          <p className={styles.bodyNormReg}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque necessitatibus
            asperiores, optio quasi sit tempora in amet aut natus, similique enim explicabo id
            expedita minima doloribus repellendus est? Quos, officia?
          </p>
        </div>
        <div className={styles.eventsContainer}>
          {/* TODO: swap placeholders for real card components */}
          <EventsCard
            imageSrc="/event-card.png"
            title="Event 1"
            description="Lorem ipsum dolor sit amet"
          />
          <EventsCard
            imageSrc="/event-card.png"
            title="Event 2"
            description="Lorem ipsum dolor sit amet"
          />
          <EventsCard
            imageSrc="/event-card.png"
            title="Event 3"
            description="Lorem ipsum dolor sit amet"
          />
          <EventsCard
            imageSrc="/event-card.png"
            title="Event 4"
            description="Lorem ipsum dolor sit amet"
          />
        </div>
      </div>
    </div>
  );
}
