"use client";

import React, { useEffect, useState } from "react";

import { Testimonial, getAllTestimonials } from "../../api/testimonial";
import TestimonialCard from "../../components/TestimonialCard";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import BackgroundHeader from "@/components/BackgroundHeader";

export default function Impact() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [events, setEvents] = useState<Testimonial[]>([]);
  const [images, setImages] = useState<BackgroundImage[]>([]);

  useEffect(() => {
    getBackgroundImages(BackgroundImagePages.HOME)
      .then((result) => {
        if (result.success) {
          setImages(result.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

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
      <BackgroundHeader
        backgroundImageURIs={images.map((image) => image.imageURI)}
        header="OUR IMPACT"
        title="Testimonials"
        description="4FLOT is committed in preventing and ending homelessness, hunger and disparity in underprivileged communities. "
      />
      <div className={styles.page}>
        <div className={styles.textContainer}>
          <div className={styles.subhead}>Read Our Stories</div>
          <div className={styles.description}>
            A nonprofit is as strong as the community that holds it up. Together, we can do more
            than we can do alone. Let&apos;s bring our abilities and passions together to make real
            change. Your donations will help feed and clothes our underprivileged and underserved
            communities.
          </div>
        </div>
        <div className={styles.quotes}>
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial._id}
              testimonial={testimonial}
              cardWidth={400}
              cardHeight={436}
              imgWidth={400}
              imgHeight={200}
            />
          ))}
        </div>
        <div className={styles.textContainer}>
          <div className={styles.subhead}>Where We&apos;ve Been</div>
          <div className={styles.description}>
            A nonprofit is as strong as the community that holds it up. Together, we can do more
            than we can do alone. Let&apos;s bring our abilities and passions together to make real
            change. Your donations will help feed and clothes our underprivileged and underserved
            communities.
          </div>
        </div>

        <div className={styles.events}>
          {events.map((event) => (
            <TestimonialCard
              key={event._id}
              testimonial={event}
              cardWidth={580}
              cardHeight={440}
              imgWidth={580}
              imgHeight={270}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
