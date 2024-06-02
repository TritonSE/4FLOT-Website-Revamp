"use client";
import React, { useEffect, useState } from "react";

import { getPageText, updatePage } from "../../../../api/pageeditor";

import styles from "./page.module.css";

import AlertBanner from "@/components/AlertBanner";
import Button from "@/components/Button";
import CancelButton from "@/components/CancelButton";
import Collapsable from "@/components/Collapsable";
import PageToggle from "@/components/PageToggle";

export default function AboutEditor() {
  const [isEdited, setIsEdited] = useState(false);
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");
  const [s2Subtitle, setS2Subtitle] = useState<string>("");
  const [s2Text, setS2Text] = useState<string>("");
  const [s3Subtitle, setS3Subtitle] = useState<string>("");
  const [s3Text, setS3Text] = useState<string>("");

  const [showAlert, setShowAlert] = useState(false);

  /* Get page data from MongoDB */
  let pageText;
  useEffect(() => {
    getPageText("About Us")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
          setS2Subtitle(pageText.pageSections[2].sectionTitle ?? "");
          setS2Text(pageText.pageSections[2].sectionSubtitle ?? "");
          setS3Subtitle(pageText.pageSections[3].sectionTitle ?? "");
          setS3Text(pageText.pageSections[3].sectionSubtitle ?? "");
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
    if (event.target.id === "Page Subtitle: Subtitle") {
      setPhSubtitle(event.target.value);
    } else if (event.target.id === "Section 1 - Our Mission: Section Title") {
      setS1Subtitle(event.target.value);
    } else if (event.target.id === "Section 1 - Our Mission: Body Text") {
      setS1Text(event.target.value);
    } else if (event.target.id === "Section 2 - Our Team: Section Title") {
      setS2Subtitle(event.target.value);
    } else if (event.target.id === "Section 2 - Our Team: Body Text") {
      setS2Text(event.target.value);
    } else if (event.target.id === "Section 3 - Contact Us: Section Title") {
      setS3Subtitle(event.target.value);
    } else if (event.target.id === "Section 3 - Contact Us: Body Text") {
      setS3Text(event.target.value);
    }
  };

  const handleSave = () => {
    // Implement save logic
    if (isEdited) {
      console.log("Save changes");
      updatePage({
        //Pass edited text to MongoDB
        page: "About Us",
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
          {
            sectionTitle: s3Subtitle,
            sectionSubtitle: s3Text,
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
      getPageText("About Us")
        .then((response) => {
          if (response.success) {
            pageText = response.data;
            setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
            setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
            setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
            setS2Subtitle(pageText.pageSections[2].sectionTitle ?? "");
            setS2Text(pageText.pageSections[2].sectionSubtitle ?? "");
            setS3Subtitle(pageText.pageSections[3].sectionTitle ?? "");
            setS3Text(pageText.pageSections[3].sectionSubtitle ?? "");
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

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <main className={styles.page}>
      <div className={styles.alert}>
        {showAlert && <AlertBanner text={"Event Details Saved!"} onClose={handleCloseAlert} />}
      </div>
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
          textbox={[phSubtitle, ""]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 1 - Our Mission"
          subsection={["Section Title", "Body Text", "Section Image"]}
          textbox={[s1Subtitle, s1Text]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 2 - Our Team"
          subsection={["Section Title", "Body Text", "Section Image"]}
          textbox={[s2Subtitle, s2Text]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 3 - Contact Us"
          subsection={["Section Title", "Body Text", "Section Image"]}
          textbox={[s3Subtitle, s3Text]}
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
