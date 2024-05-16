"use client";
import React, { useEffect, useState } from "react";

import { getPageText, updatePage } from "../../../../api/pageeditor";

import styles from "./page.module.css";

import Button from "@/components/Button";
import CancelButton from "@/components/CancelButton";
import Collapsable from "@/components/Collapsable";
import PageToggle from "@/components/PageToggle";
// import { PhpSharp } from "@mui/icons-material";

// import PageEditorCard from "@/components/PageEditorCard";

export default function ImpactEditor() {
  const [isEdited, setIsEdited] = useState(false);

  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");
  const [s2Subtitle, setS2Subtitle] = useState<string>("");

  /* Get page data from MongoDB */
  let pageText;
  useEffect(() => {
    getPageText("Our Impact")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS2Subtitle(pageText.pageSections[2].sectionTitle ?? "");
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
    } else if (event.target.id === "Section 1 - Testimonials: Subtitle") {
      setS1Subtitle(event.target.value);
    } else if (event.target.id === "Section 2 - Newsletter: Subtitle") {
      setS2Subtitle(event.target.value);
    }
  };

  const handleSave = () => {
    // Implement save logic
    if (isEdited) {
      console.log("Save changes");
      updatePage({
        //Pass edited text to MongoDB
        page: "Our Impact",
        pageSections: [
          {
            subtitle: phSubtitle,
          },
          {
            sectionTitle: s1Subtitle,
          },
          {
            sectionTitle: s2Subtitle,
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
      getPageText("Our Impact")
        .then((response) => {
          if (response.success) {
            pageText = response.data;
            setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
            setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
            setS2Subtitle(pageText.pageSections[2].sectionTitle ?? "");
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
        pages={["Our Impact", "Testimonials", "Newsletter"]}
        links={["./impact", "./testimonials", "./newsletter"]}
        currPage={0}
        refreshPage={true}
      />
      <div className={styles.sectionContainer}>
        <Collapsable
          title="Page Header"
          subsection={["Subtitle"]}
          textbox={[phSubtitle]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 1 - Testimonials"
          subsection={["Subtitle"]}
          textbox={[s1Subtitle]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 2 - Newsletter"
          subsection={["Subtitle"]}
          textbox={[s2Subtitle]}
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
