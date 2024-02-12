"use client";

import React, { useEffect, useState } from "react";

import { Event, getAllEvents } from "../../api/events";
import { Testimonial, getAllTestimonials } from "../../api/testimonial";

import EventCard from "./eventCard";
import TestimonialCard from "./testimonialCard";

export default function Impact() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getAllTestimonials()
      .then((result) => {
        if (result.success) {
          //console.log(result.data);
          setTestimonials(result.data);
        } else {
          alert(result.error);
        }
      })
      .catch((error) => {
        alert(error);
      });

    getAllEvents()
      .then((result) => {
        if (result.success) {
          setEvents(result.data);
        } else {
          alert(result.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <main
      style={{
        backgroundColor: "white",
        color: "black",
      }}
    >
      <div className="flex flex-col px-24 pt-10 pb-20">
        <h1 className="text-4xl font-bold mb-5">Read Our Stories</h1>
        <p className="mb-10">
          A nonprofit is as strong as the community that holds it up. Together, we can do more than
          we can do alone. Let&apos;s bring our abilities and passions together to make real change.
          Your donations will help feed and clothes our underprivileged and underserved communities.
        </p>
        <div className="grid grid-cols-3 gap-y-10">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>

        <h1 className="text-4xl font-bold mt-10 mb-5">Where We&apos;ve Been</h1>
        <p className="mb-10">
          A nonprofit is as strong as the community that holds it up. Together, we can do more than
          we can do alone. Let&apos;s bring our abilities and passions together to make real change.
          Your donations will help feed and clothes our underprivileged and underserved communities.
        </p>

        <div className="grid grid-cols-2 gap-y-10">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
}
