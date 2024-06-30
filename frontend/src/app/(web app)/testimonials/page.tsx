// "use client";

// import React, { useEffect, useState } from "react";

// import { getPageText } from "../../../api/pageeditor";
// import { Testimonial, getAllTestimonials } from "../../../api/testimonial";

// import styles from "./page.module.css";

// import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
// import BackgroundHeader from "@/components/BackgroundHeader";

"use client";

import React, { useEffect, useState } from "react";

import { getPageData } from "../../../api/pageeditor";
import { Testimonial, getAllTestimonials } from "../../../api/testimonial";
import { generatePageMap } from "../../../app/admin/util/pageeditUtil";
import BackgroundHeader from "../../../components/BackgroundHeader";
import TestimonialCard from "../../../components/TestimonialCard";
import LoadingSpinner from "../../../components/admin/LoadingSpinner";

import styles from "./page.module.css";

export default function Impact() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [events, setEvents] = useState<Testimonial[]>([]);
  const [pageMap, setPageMap] = useState<Map<string, string | string[]>>();
  const [loading, setLoading] = useState(false);

  const loadTestimonials = () => {
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
  };

  const loadPage = () => {
    getPageData("testimonials")
      .then((response) => {
        if (response.success) setPageMap(generatePageMap(response.data));
        else throw new Error(response.error);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    loadTestimonials();
    loadPage();
    setLoading(false);
  }, []);

  if (loading || !pageMap) {
    return <LoadingSpinner />;
  }

  return (
    <main
      style={{
        backgroundColor: "white",
        color: "black",
      }}
    >
      <BackgroundHeader
        backgroundImageURIs={pageMap.get("Header Image Carousel") as string[]}
        header="OUR IMPACT"
        title="Testimonials"
        description={pageMap.get("Subtitle") as string}
      />
      <div className={styles.page}>
        <div className={styles.textContainer}>
          <div className={styles.subhead}>{pageMap.get("Stories Section Title") as string}</div>
          <div className={styles.description}>{pageMap.get("Stories Body Text") as string}</div>
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
          <div className={styles.subhead}>{pageMap.get("Events Section Title") as string}</div>
          <div className={styles.description}>{pageMap.get("Events Body Text") as string}</div>
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
