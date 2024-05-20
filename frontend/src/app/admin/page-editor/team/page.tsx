"use client";
import React, { useState } from "react";

import styles from "./page.module.css";

import Button from "@/components/Button";
import CancelButton from "@/components/CancelButton";
import Collapsable from "@/components/Collapsable";
import PageToggle from "@/components/PageToggle";

// import PageEditorCard from "@/components/PageEditorCard";

export default function TeamEditor() {
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
        currPage={2}
        refreshPage={true}
      />
      <div className={styles.sectionContainer}>
        <Collapsable
          title="Section 1"
          subsection={["Section Title", "Body Text"]}
          textbox={[
            "Our Team",
            "Our dedicated team @ 4 Future Leaders of Tomorrow is a non-profit charitable organization committed in preventing and ending homelessness, hunger and disparity in underprivileged communities. Everyone deserves a chance for a better future!. We are reaching out by providing resources in needed communities - whether it be a delicious meal, warm clothing, educational supplies, referrals, toys or even bus passes",
          ]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 2"
          subsection={["Staff Name", "Staff Position", "Image"]}
          textbox={["Staff Name", "Officer", ""]}
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
