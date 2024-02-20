"use client";

import React from "react";

import "./page.css";
import NewsletterArchive from "../../components/NewsletterArchive";
import NewsletterCard from "../../components/NewsletterCard";

const newsletter1 = {
  _id: "1",
  image: "/newsletter1.png",
  title: "Winter 2023: Title",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
};

const newsletter2 = {
  _id: "2",
  image: "/newsletter2.png",
  title: "Special Event Newsletter",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
};

const newsletter3 = {
  _id: "3",
  image: "/newsletter2.png",
  title: "Special Event Newsletter",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
};

const newsletter4 = {
  _id: "4",
  image: "/newsletter2.png",
  title: "Special Event Newsletter",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
};

const newsletter5 = {
  _id: "2",
  image: "/newsletter2.png",
  title: "Special Event Newsletter",
  description: "Description of what this newsletter contains.",
  date: "Month XX, 20XX",
};

export default function Team() {
  return (
    <main
      style={{
        backgroundColor: "white",
        color: "black",
      }}
    >
      <div className="flex flex-col px-24 pt-24 pb-36">
        <h1 className="text-5xl font-bold mb-9">Quarterly Updates</h1>
        <p className="text-2xl">
          Description of general newsletter content, what to expect in the newsletters, etc.
        </p>
        <div className="flex flex-col gap-24 mt-14 mb-24">
          <NewsletterCard newsletter={newsletter1}></NewsletterCard>
          <NewsletterCard newsletter={newsletter2}></NewsletterCard>
        </div>
        <h1 className="text-3xl font-bold mb-8">Archive</h1>
        <NewsletterArchive year="2024" newsletters={[newsletter5]} />
        <NewsletterArchive
          year="2023"
          newsletters={[newsletter1, newsletter2, newsletter3, newsletter4]}
        />
      </div>
    </main>
  );
}
