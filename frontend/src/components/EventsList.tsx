"use client";
import React, { useEffect, useState } from "react";

import { EventDetails, getAllEventDetails } from "../api/eventDetails";

import EventCard from "./EventsCard";

type EventsListProps = {
  page: string;
};

export default function EventsList({ page }: EventsListProps) {
  const [events, setEvents] = useState<EventDetails[]>([]);

  // Fetch events
  useEffect(() => {
    getAllEventDetails()
      .then((response) => {
        if (response.success) {
          setEvents(response.data);
        } else {
          alert(response.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  if (page === "home") {
    return (
      <div
        style={{ display: "flex", flexWrap: "wrap", columnGap: "24px", rowGap: "50px" }}
        className="events"
      >
        {events.length === 0 ? (
          <p>Loading...</p>
        ) : (
          events.map((event: EventDetails) => (
            <EventCard key={event._id} event={event} page={page} />
          ))
        )}
      </div>
    );
  } else {
    return (
      <div
        style={{ display: "flex", flexWrap: "wrap", columnGap: "85px", rowGap: "85px" }}
        className="events"
      >
        {events.length === 0 ? (
          <p>Loading...</p>
        ) : (
          events.map((event: EventDetails) => (
            <EventCard key={event._id} event={event} page={page} />
          ))
        )}
      </div>
    );
  }
}
