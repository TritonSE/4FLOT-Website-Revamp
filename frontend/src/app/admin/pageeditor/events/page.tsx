"use client";
import React, { useEffect, useState } from "react";

import { getPageText, updatePage } from "../../../../api/pageeditor";

import styles from "./page.module.css";

import Button from "@/components/Button";
import CancelButton from "@/components/CancelButton";
import Collapsable from "@/components/Collapsable";
import PageToggle from "@/components/PageToggle";

export default function EventsPageEditor() {
  const [isEdited, setIsEdited] = useState(false);
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Title, setS1Title] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");

  /* Get page data from MongoDB */
  let pageText;
  useEffect(() => {
    getPageText("Upcoming Events")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Title(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
          console.log("response.data: ", response.data);
        } else {
          alert(response.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  /* Handle Fields upon edit */
  const handleEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEdited(true);
    if (event.target.id === "Subtitle") {
      setPhSubtitle(event.target.value);
    } else if (event.target.id === "Section Title") {
      setS1Title(event.target.value);
    } else if (event.target.id === "Section Subtitle") {
      setS1Text(event.target.value);
    }
  };

  const handleSave = () => {
    // Implement save logic
    if (isEdited) {
      console.log("Save changes");
      updatePage({
        //Pass edited text to MongoDB
        page: "Upcoming Events",
        pageSections: [
          {
            subtitle: phSubtitle,
          },
          {
            sectionTitle: s1Title,
            sectionSubtitle: s1Text,
          },
        ],
      })
        .then((response) => {
          if (response.success) {
            alert("Success!");
          } else {
            alert(response.error);
          }
        })
        .catch((error) => {
          alert(error);
        });
      setIsEdited(false);
    }
  };

  const handleCancel = () => {
    // Implement cancel logic
    if (isEdited) {
      console.log("Cancel changes");
      getPageText("Upcoming Events")
        .then((response) => {
          if (response.success) {
            pageText = response.data;
            setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
            setS1Title(pageText.pageSections[1].sectionTitle ?? "");
            setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
          } else {
            alert(response.error);
          }
        })
        .catch((error) => {
          alert(error);
        });
      setIsEdited(false);
    }
  };

  return (
    <main className={styles.page}>
      <PageToggle
        pages={["Get Involved", "Upcoming Events"]}
        links={["./involved", "./events"]}
        currPage={1}
        refreshPage={true}
      />
      <div className={styles.sectionContainer}>
        <Collapsable
          title="Page Header"
          subsection={["Subtitle", "Header Image"]}
          textbox={[phSubtitle, ""]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 1"
          subsection={["Section Title", "Section Subtitle"]}
          textbox={[s1Title, s1Text]}
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
