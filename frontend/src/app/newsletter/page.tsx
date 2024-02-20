"use client";

import React from "react";

import "./page.css";
import NewsletterCard from "../../components/NewsletterCard";

export default function Team() {
  return (
    <main
      style={{
        backgroundColor: "white",
        color: "black",
      }}
    >
      <div className="flex flex-col px-24 pt-24 pb-20">
        <h1 className="text-5xl font-bold mb-9">Quarterly Updates</h1>
        <p className="text-2xl">
          Description of general newsletter content, what to expect in the newsletters, etc.
        </p>
        <div className="flex flex-col gap-24 mt-14 mb-24">
          <NewsletterCard
            image="/newsletter1.png"
            title="Winter 2023: Title"
            description="Description of what this newsletter contains."
            date="Month XX, 20XX"
          ></NewsletterCard>
          <NewsletterCard
            image="/newsletter2.png"
            title="Special Event Newsletter"
            description="Description of what this newsletter contains."
            date="Month XX, 20XX"
          ></NewsletterCard>
        </div>
      </div>
    </main>
  );
}
