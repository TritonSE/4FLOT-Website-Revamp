"use client";
import React, { useEffect, useState } from "react";

import { EventDetails, getAllEventDetails } from "../api/eventDetails";

import EventCard from "./EventsCard";

type EventsListProps = {
  page: string;
};

export default function EventsList({ page }: EventsListProps) {
  const [pastEvents, setPastEvents] = useState<EventDetails[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventDetails[]>([]);

  // Fetch events
  useEffect(() => {
    getAllEventDetails()
      .then((response) => {
        if (response.success) {
          const currentDate = new Date();

          const filteredPastEvents = response.data.filter((item) => {
            const eventDate = new Date(item.date);
            return eventDate < currentDate;
          });
          setPastEvents(filteredPastEvents);

          const filteredUpcomingEvents = response.data.filter((item) => {
            const eventDate = new Date(item.date);
            return eventDate >= currentDate;
          });
          setUpcomingEvents(filteredUpcomingEvents);
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
        {upcomingEvents.length === 0 ? (
          <p>Loading...</p>
        ) : (
          upcomingEvents.map((event: EventDetails) => (
            <EventCard key={event._id} event={event} page={page} />
          ))
        )}
      </div>
    );
  } else if (page === "upcoming-events") {
    return (
      <div
        style={{ display: "flex", flexWrap: "wrap", columnGap: "85px", rowGap: "85px" }}
        className="events"
      >
        {upcomingEvents.length === 0 ? (
          <p>Loading...</p>
        ) : (
          upcomingEvents.map((event: EventDetails) => (
            <EventCard key={event._id} event={event} page={page} />
          ))
        )}
      </div>
    );
  } else if (page === "past-events") {
    return (
      <div
        style={{ display: "flex", flexWrap: "wrap", columnGap: "85px", rowGap: "85px" }}
        className="events"
      >
        {pastEvents.length === 0 ? (
          <p>Loading...</p>
        ) : (
          pastEvents.map((event: EventDetails) => (
            <EventCard key={event._id} event={event} page={page} />
          ))
        )}
      </div>
    );
  }
}
