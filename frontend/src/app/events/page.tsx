import Image from "next/image";
import React from "react";

import EventsList from "../components/EventsList";

import styles from "./page.module.css";

export default function UpcomingEvents() {
  return (
    <div className="items-center justify-center">
      <div className="items-center justify-center self-center">
        <div className="bg-[#484848] p-0 m-0 justify-center items-center">
          <Image
            className="relative w-screen opacity-60 overflow-hidden"
            src="https://i.imgur.com/QIFAqLQ.png"
            alt="Placeholder Header Image"
            width={1440}
            height={558}
            priority
          />
        </div>
        <div className="absolute top-[10vw] left-12 w-full h-auto">
          <p style={{ color: "white", font: "var(--font-body)" }}>GET INVOLVED</p>
          <h1 style={{ color: "white", font: "var(--font-title-xl)" }}>Upcoming Events</h1>
          <p className="max-w-2xl text-white" style={{ font: "var(--font-body)" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptas nemo, ea facilis
            cum repellat libero tempore nulla temporibus officiis quas eaque, asperiores aliquid
            minus soluta nobis excepturi perspiciatis nesciunt.
          </p>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyTitle}>
          <h1 style={{ font: "var(--font-title-l)" }}>Volunteer With Us</h1>
          <p style={{ font: "var(--font-body-reg)" }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque necessitatibus
            asperiores, optio quasi sit tempora in amet aut natus, similique enim explicabo id
            expedita minima doloribus repellendus est? Quos, officia?
          </p>
        </div>
        <EventsList />
      </div>
    </div>
  );
}