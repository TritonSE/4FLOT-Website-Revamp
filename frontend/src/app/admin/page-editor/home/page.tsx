"use client";
import React, { useEffect, useState } from "react";

import { getPageText, updatePage } from "../../../../api/pageeditor";

import styles from "./page.module.css";

import Button from "@/components/Button";
import CancelButton from "@/components/CancelButton";
import Collapsable from "@/components/Collapsable";
import PageToggle from "@/components/PageToggle";

// import PageEditorCard from "@/components/PageEditorCard";

export default function HomeEditor() {
  const [isEdited, setIsEdited] = useState(false);
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");
  const [s2Subtitle, setS2Subtitle] = useState<string>("");
  const [s2Text, setS2Text] = useState<string>("");

  /* Get page data from MongoDB */
  let pageText;
  useEffect(() => {
    getPageText("Home")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
          setS2Subtitle(pageText.pageSections[2].sectionTitle ?? "");
          setS2Text(pageText.pageSections[2].sectionSubtitle ?? "");
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
    if (event.target.id === "Page Header: Subtitle") {
      setPhSubtitle(event.target.value);
    } else if (event.target.id === "Section 1: Section Title") {
      setS1Subtitle(event.target.value);
    } else if (event.target.id === "Section 1: Body Text") {
      setS1Text(event.target.value);
    } else if (event.target.id === "Section 2: Section Title") {
      setS2Subtitle(event.target.value);
    } else if (event.target.id === "Section 2: Body Text") {
      setS2Text(event.target.value);
    }
  };

  const handleSave = () => {
    // Implement save logic
    if (isEdited) {
      console.log("Save changes");
      updatePage({
        //Pass edited text to MongoDB
        page: "Home",
        pageSections: [
          {
            subtitle: phSubtitle,
          },
          {
            sectionTitle: s1Subtitle,
            sectionSubtitle: s1Text,
          },
          {
            sectionTitle: s2Subtitle,
            sectionSubtitle: s2Text,
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
      getPageText("Home")
        .then((response) => {
          if (response.success) {
            pageText = response.data;
            setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
            setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
            setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
            setS2Subtitle(pageText.pageSections[2].sectionTitle ?? "");
            setS2Text(pageText.pageSections[2].sectionSubtitle ?? "");
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
      <PageToggle pages={["Home"]} links={["./home"]} currPage={0} />
      <div className={styles.sectionContainer}>
        <Collapsable
          title="Page Header"
          subsection={["Subtitle", "Header Image Carousel"]}
          textbox={[phSubtitle]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 1"
          subsection={["Section Title", "Body Text"]}
          textbox={[s1Subtitle, s1Text]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 2"
          subsection={["Section Title", "Body Text", "Sponsor Image Gallery"]}
          textbox={[s2Subtitle, s2Text]}
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
