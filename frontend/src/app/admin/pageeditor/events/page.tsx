"use client";
import React, { useState } from "react";

import { updatePage } from "../../../../api/pageeditor";

import styles from "./page.module.css";

import Button from "@/components/Button";
import CancelButton from "@/components/CancelButton";
import Collapsable from "@/components/Collapsable";
import PageToggle from "@/components/PageToggle";

// import PageEditorCard from "@/components/PageEditorCard";

export default function Dashboard() {
  const [isEdited, setIsEdited] = useState(false);
  // const [phSubtitle, setPhSubtitle] = useState<string>("");
  // const [s1Subtitle, setS1Subtitle] = useState<string>("");
  // const [s1Text, setS1Text] = useState<string>("");

  let phSubtitle;
  let s1Subtitle;
  let s1Text;
  const handleEdit = () => {
    setIsEdited(true);
    phSubtitle = document.getElementById("0") as HTMLInputElement;
    s1Subtitle = document.getElementById("1") as HTMLInputElement;
    s1Text = document.getElementById("2") as HTMLInputElement;
  };

  const handleSave = () => {
    // Implement save logic
    if (isEdited) {
      console.log("Save changes");
      updatePage({ phSubtitle, s1Subtitle, s1Text });
    }
  };

  const handleCancel = () => {
    // Implement cancel logic
    console.log("Cancel changes");
  };

  return (
    <main className={styles.page}>
      <PageToggle
        pages={["Get Involved", "Upcoming Events"]}
        links={["./involved", "./events"]}
        currPage={1}
      />
      <div className={styles.sectionContainer}>
        <Collapsable
          title="Page Header"
          subsection={["Subtitle", "Header Image"]}
          textbox={[
            "Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.",
            "",
          ]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 1"
          subsection={["Section Title", "Section Subtitle"]}
          textbox={[
            "Volunteer With Us",
            "Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.",
          ]}
          onChange={handleEdit}
        />
        <div className={styles.buttonContainer}>
          <CancelButton text="Cancel" color={isEdited ? "active" : "unactive"} />
          <Button text="Save" color={isEdited ? "active" : "unactive"} onClick={handleSave} />
        </div>
      </div>
    </main>
  );
}
