"use client";

import React, { useEffect, useState } from "react";

import { Testimonial, getAllTestimonials } from "../../api/testimonial";

import EventCard from "../../components/eventCard";
import TestimonialCard from "../../components/testimonialCard";

import "./page.css";

export default function Impact() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [events, setEvents] = useState<Testimonial[]>([]);

  useEffect(() => {
    getAllTestimonials()
      .then((result) => {
        if (result.success) {
          const filteredEvents = result.data.filter((item) => item.type === "event");
          setEvents(filteredEvents);
          const filteredQuotes = result.data.filter((item) => item.type === "quote");
          setTestimonials(filteredQuotes);
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
      <div className="flex flex-col px-24 pt-24 pb-20">
        <h1 className="text-5xl font-bold mb-8">Read Our Stories</h1>
        <p className="text-2xl mb-16">
          A nonprofit is as strong as the community that holds it up. Together, we can do more than
          we can do alone. Let&apos;s bring our abilities and passions together to make real change.
          Your donations will help feed and clothes our underprivileged and underserved communities.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-14">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>

        <h1 className="text-4xl font-bold mt-36 mb-5">Where We&apos;ve Been</h1>
        <p className="text-2xl mb-20">
          A nonprofit is as strong as the community that holds it up. Together, we can do more than
          we can do alone. Let&apos;s bring our abilities and passions together to make real change.
          Your donations will help feed and clothes our underprivileged and underserved communities.
        </p>

        <div className="flex flex-wrap gap-x-20 gap-y-14 mb-64">
          {events.map((event) => (
            <EventCard key={event._id} testimonial={event} />
          ))}
        </div>
      </div>
    </main>
  );
}
