"use client";
import React, { useState } from "react";

import styles from "./page.module.css";

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

  const handleSave = () => {
    // Implement save logic
    console.log("Save changes");
    setIsEdited(false);
  };

  const handleCancel = () => {
    // Implement cancel logic
    console.log("Cancel changes");
    setIsEdited(false);
  };

  return (
    <main className={styles.page}>
      <PageToggle
        pages={["About Us", "Our Mission", "Our Team", "Contact Us"]}
        links={["./about", "./mission", "./team", "./contact"]}
        currPage={0}
        refreshPage={true}
      />
      <div className={styles.sectionContainer}>
        <Collapsable
          title="Page Subtitle"
          subsection={["Subtitle"]}
          textbox={[
            "4FLOT is committed in preventing and ending homelessness, hunger and disparity in underprivileged communities. ",
          ]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 1 - Our Mission"
          subsection={["Section Title", "Body Text", "Section Image"]}
          textbox={[
            "Why We Do It",
            "Leading the way for generations to come! Together we can .... make a difference by paying it forward with Love, Compassion, and Community Outreach for all humanity.",
            "",
          ]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 2 - Our Team"
          subsection={["Section Title", "Body Text", "Section Image"]}
          textbox={[
            "Meet our Team",
            "Leading the way for generations to come! Together we can .... make a difference by paying it forward with Love, Compassion, and Community Outreach for all humanity.",
            "",
          ]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 3 - Contact Us"
          subsection={["Section Title", "Body Text", "Section Image"]}
          textbox={[
            "Stay Connected",
            "Leading the way for generations to come! Together we can .... make a difference by paying it forward with Love, Compassion, and Community Outreach for all humanity.",
            "",
          ]}
          onChange={handleEdit}
        />
        <div className={styles.buttonContainer}>
          <CancelButton
            text="Cancel"
            color={isEdited ? "active" : "unactive"}
            onClick={handleCancel}
          />
          <Button text="Save" color={isEdited ? "active" : "unactive"} onClick={handleSave} />
        </div>
      </div>
    </main>
  );
}
