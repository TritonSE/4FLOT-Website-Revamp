"use client";
import styles from "./page.module.css";
import React, { useState } from "react";

import Button from "@/components/Button";
import CancelButton from "@/components/CancelButton";
import Collapsable from "@/components/Collapsable";
import PageToggle from "@/components/PageToggle";

// import PageEditorCard from "@/components/PageEditorCard";

export default function Dashboard() {
  const [isEdited, setIsEdited] = useState(false);

  const handleEdit = () => {
    setIsEdited(true);
  };
  return (
    <main className={styles.page}>
      <PageToggle pages={["Home"]} links={["./home"]} currPage={0} />
      <div className={styles.sectionContainer}>
        <Collapsable
          title="Page Header"
          subsection={["Subtitle", "Header Image Carousel"]}
          textbox={[
            "4FLOT is committed in preventing and ending homelessness, hunger and disparity in underprivileged communities.",
            "",
          ]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 1"
          subsection={["Section Title", "Body Text"]}
          textbox={[
            "Get Involved at our Upcoming Events",
            "Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.",
          ]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 2"
          subsection={["Section Title", "Body Text", "Sponsor Image Gallery"]}
          textbox={[
            "Our Community Sponsors",
            "Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.",
          ]}
          onChange={handleEdit}
        />
        <div className={styles.buttonContainer}>
          <CancelButton text="Cancel" color={isEdited ? "active" : "unactive"} />
          <Button text="Save" color={isEdited ? "active" : "unactive"} />
        </div>
      </div>
    </main>
  );
}
