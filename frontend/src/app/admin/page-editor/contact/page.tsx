"use client";
import React, { useState } from "react";

import styles from "./page.module.css";

import Button from "@/components/Button";
import CancelButton from "@/components/CancelButton";
import Collapsable from "@/components/Collapsable";
import PageToggle from "@/components/PageToggle";

export default function ContactEditor() {
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
        currPage={3}
        refreshPage={true}
      />
      <div className={styles.sectionContainer}>
        <Collapsable
          title="Section 1"
          subsection={[
            "Section Title",
            "Value #1",
            "Value #1 Description",
            "Value #2",
            "Value #2 Description",
            "Value #3",
            "Value #3 Description",
          ]}
          textbox={[
            "We pay it forward with...",
            "Service",
            "Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.",
            "Compassion",
            "Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.",
            "Community",
            "Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.",
          ]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 2"
          subsection={["Section Title", "Body Text", "Image Gallery"]}
          textbox={[
            "Here's our Story",
            'At one point or another, each of the founding members have gone through personal struggles, some have experienced homelessness, hunger, medical illnesses and others juggled single parenting, while furthering their education, and so on. However, the common denominator was that each of us needed Help. So now we are "The Helpers" 4 Future Leaders of Tomorrow -because the people we help are our future.',
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
