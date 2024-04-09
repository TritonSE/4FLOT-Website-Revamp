"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { EventDetails, getEventDetails } from "../../../../api/eventDetails";
import SectionCard from "../../../../components/SectionCard";
import VolunteerPopup from "../../../../components/VolunteerPopup";

import styles from "./page.module.css";

import Button from "@/components/Button";

type Props = {
  params: { eventId: string };
};

export default function EventSignup({ params }: Props) {
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [popupOpen, setPopup] = useState(false);

  useEffect(() => {
    // Fetch event details
    getEventDetails(params.eventId)
      .then((response) => {
        if (response.success) {
          setEvent(response.data);
        } else {
          alert(response.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className={styles.popup}>
        <VolunteerPopup open={popupOpen} setOpen={setPopup} eventId={event ? event._id : ""} />
      </div>
      <div className="bg-[#484848] p-0 m-0 justify-center items-center">
        <Image
          className="opacity-60 w-screen"
          src="https://i.imgur.com/QIFAqLQ.png"
          alt="Placeholder Header Image"
          width={1440}
          height={558}
          priority
        />
      </div>
      <SectionCard
        className="-m-40 z-10"
        topText="VOLUNTEER"
        title={event?.name ?? "Loading..."}
        description={event?.description ?? "Loading..."}
        showTopText
      />
      <div
        className="flex flex-col gap-16 m-10 px-24 py-40 max-w-[1440px]"
        style={{ width: "98vw" }}
      >
        <div className={`${styles.details} flex flex-row gap-9`}>
          <div className="w-1/2">
            <Image src="/eventSignupGraphic.svg" alt="People with Boxes" width={578} height={500} />
          </div>
          <div className="w-1/2">
            <div className="flex flex-col text-left pt-20 h-[500px]">
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
              <div className="flex-grow w-full h-auto overflow-hidden text-ellipsis">
                <p style={{ font: "var(--font-body)" }} className="min-w-0">
                  {event ? event.guidelines : "Loading..."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button
            text={"Sign-Up to Volunteer!"}
            onClick={() => {
              setPopup(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}
