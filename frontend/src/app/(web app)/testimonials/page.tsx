"use client";

import React, { useEffect, useState } from "react";

import { getPageText } from "../../../api/pageeditor";
import { Testimonial, getAllTestimonials } from "../../../api/testimonial";
import TestimonialCard from "../../../components/TestimonialCard";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import BackgroundHeader from "@/components/BackgroundHeader";

export default function Impact() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [events, setEvents] = useState<Testimonial[]>([]);
  const [images, setImages] = useState<BackgroundImage[]>([]);

  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");
  const [s2Title, setS2Title] = useState<string>("");
  const [s2Subtitle, setS2Subtitle] = useState<string>("");

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

  let pageText;
  useEffect(() => {
    getPageText("Testimonials")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
          setS2Title(pageText.pageSections[2].sectionTitle ?? "");
          setS2Subtitle(pageText.pageSections[2].sectionSubtitle ?? "");
        } else {
          alert(response.error);
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
        description={phSubtitle}
      />
      <div className={styles.page}>
        <div className={styles.textContainer}>
          <div className={styles.subhead}>{s1Subtitle}</div>
          <div className={styles.description}>{s1Text}</div>
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
          <div className={styles.subhead}>{s2Title}</div>
          <div className={styles.description}>{s2Subtitle}</div>
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
