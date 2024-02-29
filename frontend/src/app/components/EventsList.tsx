"use client";
import React, { useEffect, useState } from "react";

import { EventDetails, getAllEventDetails } from "../../api/eventDetails";

import EventCard from "./events-card";

export default function EventsList() {
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
  return (
    <div className="grid grid-cols-2 gap-20">
      {events.length === 0 ? (
        <p>Loading...</p>
      ) : (
        events.map((event: EventDetails) => (
          <EventCard key={event._id} className="w-full" event={event} />
        ))
      )}
    </div>
  );
}
