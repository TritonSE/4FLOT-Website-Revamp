// Admin Page Editor landing page
import styles from "./page.module.css";
import React, { useState } from 'react';

import Button from "@/components/Button";
import Collapsable from "@/components/Collapsable";
import PageToggle from "@/components/PageToggle";

// import PageEditorCard from "@/components/PageEditorCard";

export default function Dashboard() {
  const [isEdited, setIsEdited] = useState(false);
  const handleEdit = () => {
    if (!isEdited) setIsEdited(true);
  };

  const handleSave = () => {
    // Implement save logic
    console.log('Save changes');
  };

  const handleCancel = () => {
    // Implement cancel logic
    console.log('Cancel changes');
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
        />
        <Collapsable
          title="Section 1"
          subsection={["Section Title", "Section Subtitle"]}
          textbox={[
            "Volunteer With Us",
            "Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi.",
          ]}
        />
        <div className={styles.buttonContainer}>
          <Button text="Cancel" />
          <Button text="Save" />
        </div>
      </div>
    </main>
  );
}
