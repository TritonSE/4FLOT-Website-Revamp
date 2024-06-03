"use client";
import React, { useEffect, useState } from "react";

import { getPageText, updatePage } from "../../../../api/pageeditor";
import styles from "../about/page.module.css";

import { updateRecord } from "@/api/records";
import AlertBanner from "@/components/AlertBanner";
import Button from "@/components/Button";
import CancelButton from "@/components/CancelButton";
import Collapsable from "@/components/Collapsable";
import PageToggle from "@/components/PageToggle";
import { WarningModule } from "@/components/WarningModule";

export default function MissionEditor() {
  const [isEdited, setIsEdited] = useState(false);
  const [valueSubtitle, setvalueSubtitle] = useState<string>("");
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [Value1, setValue1] = useState<string>("");
  const [Value1_Description, setValue1_Description] = useState<string>("");
  const [Value2, setValue2] = useState<string>("");
  const [Value2_Description, setValue2_Description] = useState<string>("");
  const [Value3, setValue3] = useState<string>("");
  const [Value3_Description, setValue3_Description] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");

  const [showAlert, setShowAlert] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  /* Get page data from MongoDB */
  let pageText;
  useEffect(() => {
    getPageText("Our Mission")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setvalueSubtitle(pageText.pageSections[1].subtitle ?? "");
          setValue1(pageText.pageSections[2].sectionTitle ?? "");
          setValue1_Description(pageText.pageSections[2].sectionSubtitle ?? "");
          setValue2(pageText.pageSections[3].sectionTitle ?? "");
          setValue2_Description(pageText.pageSections[3].sectionSubtitle ?? "");
          setValue3(pageText.pageSections[4].sectionTitle ?? "");
          setValue3_Description(pageText.pageSections[4].sectionSubtitle ?? "");
          setS1Subtitle(pageText.pageSections[5].sectionTitle ?? "");
          setS1Text(pageText.pageSections[5].sectionSubtitle ?? "");
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
    } else if (event.target.id === "Section 1: Section Title") {
      setvalueSubtitle(event.target.value);
    } else if (event.target.id === "Section 1: Value #1") {
      setValue1(event.target.value);
    } else if (event.target.id === "Section 1: Value #1 Description") {
      setValue1_Description(event.target.value);
    } else if (event.target.id === "Section 1: Value #2") {
      setValue2(event.target.value);
    } else if (event.target.id === "Section 1: Value #2 Description") {
      setValue2_Description(event.target.value);
    } else if (event.target.id === "Section 1: Value #3") {
      setValue3(event.target.value);
    } else if (event.target.id === "Section 1: Value #3 Description") {
      setValue3_Description(event.target.value);
    } else if (event.target.id === "Section 2: Section Title") {
      setS1Subtitle(event.target.value);
    } else if (event.target.id === "Section 2: Body Text") {
      setS1Text(event.target.value);
    }
  };

  const handleSave = () => {
    // Implement save logic
    if (isEdited) {
      console.log("Save changes");
      updatePage({
        //Pass edited text to MongoDB
        page: "Our Mission",
        pageSections: [
          {
            subtitle: phSubtitle,
          },
          {
            subtitle: valueSubtitle,
          },
          {
            sectionTitle: Value1,
            sectionSubtitle: Value1_Description,
          },
          {
            sectionTitle: Value2,
            sectionSubtitle: Value2_Description,
          },
          {
            sectionTitle: Value3,
            sectionSubtitle: Value3_Description,
          },
          {
            sectionTitle: s1Subtitle,
            sectionSubtitle: s1Text,
          },
        ],
      })
        .then((response) => {
          if (response.success) {
            setShowAlert(true);
          } else {
            alert(response.error);
          }
        })
        .catch((error) => {
          alert(error);
        });
      updateRecord("about")
        .then()
        .catch((error) => {
          alert(error);
        });
      setIsEdited(false);
    }
    setWarningOpen(false);
  };

  const handleCancel = () => {
    // Show cancel warning
    if (isEdited) {
      setWarningOpen(true);
    }
  };

  const confirmCancel = () => {
    // Implement cancel logic
    setWarningOpen(false);
    console.log("Cancel changes");
    getPageText("Our Mission")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setvalueSubtitle(pageText.pageSections[1].subtitle ?? "");
          setValue1(pageText.pageSections[2].sectionTitle ?? "");
          setValue1_Description(pageText.pageSections[2].sectionSubtitle ?? "");
          setValue2(pageText.pageSections[3].sectionTitle ?? "");
          setValue2_Description(pageText.pageSections[3].sectionSubtitle ?? "");
          setValue3(pageText.pageSections[4].sectionTitle ?? "");
          setValue3_Description(pageText.pageSections[4].sectionSubtitle ?? "");
          setS1Subtitle(pageText.pageSections[5].sectionTitle ?? "");
          setS1Text(pageText.pageSections[5].sectionSubtitle ?? "");
        } else {
          alert(response.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
    setIsEdited(false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <main className={styles.page}>
      <div className={styles.alert}>
        {showAlert && <AlertBanner text={"Event Details Saved!"} onClose={handleCloseAlert} />}
      </div>
      <div>
        {warningOpen && <div className={styles.grayOut}></div>}
        <div className={styles.warningPopup}>
          {warningOpen && (
            <WarningModule
              titleText="You have unsaved changes!"
              subtitleText="Do you want to save the changes you made to this event?"
              cancelText="Discard changes"
              actionText="Save changes"
              cancel={confirmCancel}
              action={handleSave}
              onClose={() => {
                setWarningOpen(false);
              }}
            />
          )}
        </div>
      </div>
      <PageToggle
        pages={["About Us", "Our Mission", "Our Team"]}
        links={["./about", "./mission", "./team", "./contact"]}
        currPage={1}
        refreshPage={true}
      />
      <div className={styles.sectionContainer}>
        <Collapsable
          title="Page Subtitle"
          subsection={["Subtitle"]}
          textbox={[phSubtitle]}
          onChange={handleEdit}
        />
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
            valueSubtitle,
            Value1,
            Value1_Description,
            Value2,
            Value2_Description,
            Value3,
            Value3_Description,
          ]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 2"
          subsection={["Section Title", "Body Text", "Image Gallery"]}
          textbox={[s1Subtitle, s1Text, ""]}
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
