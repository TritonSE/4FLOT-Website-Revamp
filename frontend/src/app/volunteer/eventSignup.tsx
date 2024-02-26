"use client";

import Image from "next/image";
import React, { useState } from "react";

import { EventDetails } from "../../api/eventDetails";

import SectionCard from "../components/SectionCard";
import VolunteerPopup from "../components/VolunteerPopup";
import styles from "./eventSignup.module.css";

type EventSignupProps = {
  event: EventDetails | null;
};

export default function EventSignup({ event }: EventSignupProps) {
  const [popupOpen, setPopup] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <VolunteerPopup open={popupOpen} setOpen={setPopup} />
      <Image
        className="Image1"
        src="https://i.imgur.com/QIFAqLQ.png"
        alt="Placeholder Header Image"
        width={1440}
        height={558}
        priority
      />
      <SectionCard
        className="top-[341px]"
        topText="VOLUNTEER"
        title={event?.name ?? "Loading..."}
        description={event?.description ?? "Loading..."}
        showTopText
      />
      <div className="flex flex-col gap-16 px-24 py-40 max-w-[1440px]" style={{ width: "98vw" }}>
        <div className={`${styles.details} flex flex-row gap-9`}>
          <div className="w-1/2">
            <Image src="/eventSignupGraphic.svg" alt="People with Boxes" width={578} height={500} />
          </div>
          <div className="w-1/2">
            <div className="flex flex-col text-left py-20 h-[500px]">
              <p style={{ font: "var(--font-title-l)" }} className="mb-8">
                Details
              </p>
              <p style={{ font: "var(--font-body-bold)" }} className="mb-2">
                Date/Time:
              </p>
              <p style={{ font: "var(--font-body)" }} className="mb-6">
                {event ? event.date : "Loading..."}
              </p>
              <p style={{ font: "var(--font-body-bold)" }} className="mb-2">
                Location:
              </p>
              <p style={{ font: "var(--font-body)" }} className="mb-6">
                {event ? event.location : "Loading..."}
              </p>
              <p style={{ font: "var(--font-body-bold)" }} className="mb-2">
                Guidelines:
              </p>
              <p style={{ font: "var(--font-body)" }} className="mb-6">
                {event ? event.guidelines : "Loading..."}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className={styles.button}
            onClick={() => {
              setPopup(true);
            }}
          >
            Sign-Up to Volunteer!
          </button>
        </div>
      </div>
    </div>
  );
}
