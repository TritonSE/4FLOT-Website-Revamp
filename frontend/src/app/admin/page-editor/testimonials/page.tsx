"use client";
import React, { useEffect, useState } from "react";

import { getPageText, updatePage } from "../../../../api/pageeditor";
import {
  Testimonial,
  createTestimonial,
  getAllQuotes,
  updateTestimonial,
} from "../../../../api/testimonial";

import styles from "./page.module.css";

import AlertBanner from "@/components/AlertBanner";
import Button from "@/components/Button";
import CancelButton from "@/components/CancelButton";
import Collapsable from "@/components/Collapsable";
import PageToggle from "@/components/PageToggle";
import { WarningModule } from "@/components/WarningModule";

export default function TestimonialsEditor() {
  const [isEdited, setIsEdited] = useState(false);
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");
  const [s2Title, setS2Title] = useState<string>("");
  const [s2Subtitle, setS2Subtitle] = useState<string>("");

  const [testimonialData, setTestimonialData] = useState<Testimonial[]>([]); //Holds all testimonials as Testimonials
  const [testimonialArray, setTestimonialArray] = useState<string[][]>([]); //Holds all testimonials as strings
  const [editedTestimonials] = useState<Set<number>>(new Set()); //Indices of edited testimonials

  const [showAlert, setShowAlert] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  /* Get page data from MongoDB */
  let pageText;
  useEffect(() => {
    getAllQuotes()
      .then((response2) => {
        if (response2.success) {
          setTestimonialData(response2.data);
          const newArray: string[][] = [];
          for (const elem of response2.data) {
            newArray.push([elem.title, elem.description]); // and one new item at the end
          }
          setTestimonialArray(newArray);
        } else {
          alert(response2.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
    getPageText("Testimonials")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
          setS2Title(pageText.pageSections[2].sectionTitle ?? "");
          setS2Subtitle(pageText.pageSections[2].sectionSubtitle ?? "");
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
    } else if (event.target.id === "Section 1: Subtitle") {
      setS1Text(event.target.value);
    } else if (event.target.id === "Section 2: Section Title") {
      setS2Title(event.target.value);
    } else if (event.target.id === "Section 2: Subtitle") {
      setS2Subtitle(event.target.value);
    } else if (event.target.id.startsWith("Testimonial Header")) {
      const testimonialIndex = Number(event.target.id.slice(event.target.id.indexOf(":") + 2));
      //Update textarea by changing testimonialArray element
      const updateArray = testimonialArray.map((elem, index) => {
        if (index === testimonialIndex) {
          return [event.target.value, elem[1]];
        } else {
          return elem;
        }
      });
      setTestimonialArray(updateArray);
      editedTestimonials.add(testimonialIndex); //Add index to list of edited indices
    } else if (event.target.id.startsWith("Testimonial Description")) {
      const testimonialIndex = Number(event.target.id.slice(event.target.id.indexOf(":") + 2));
      //Update textarea by changing testimonialArray element
      const updateArray = testimonialArray.map((elem, index) => {
        if (index === testimonialIndex) {
          return [elem[0], event.target.value];
        } else {
          return elem;
        }
      });
      setTestimonialArray(updateArray);
      editedTestimonials.add(testimonialIndex); //Add index to list of edited indices
    }
  };

  const handleSave = () => {
    // Implement save logic
    if (isEdited) {
      console.log("Save Testimonials Page");
      updatePage({
        //Pass edited text to MongoDB
        page: "Testimonials",
        pageSections: [
          {
            subtitle: phSubtitle,
          },
          {
            sectionTitle: s1Subtitle,
            sectionSubtitle: s1Text,
          },
          {
            sectionTitle: s2Title,
            sectionSubtitle: s2Subtitle,
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

      if (editedTestimonials.size > 0) {
        //Pass edited testimonials to MongoDB
        for (const index of Array.from(editedTestimonials)) {
          //If creating new testimonial
          if (index >= testimonialData.length) {
            createTestimonial({
              title: testimonialArray[index][0],
              description: testimonialArray[index][1],
              image: "/impact1.png",
              type: "quote",
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
          } else {
            //If editing testimonial
            //Update testimonial with edited values stored in testimonialArray
            testimonialData[index].title = testimonialArray[index][0];
            testimonialData[index].description = testimonialArray[index][1];
            updateTestimonial(testimonialData[index])
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
          }
        }
      }
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
    getPageText("Testimonials")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
          setS2Title(pageText.pageSections[2].sectionTitle ?? "");
          setS2Subtitle(pageText.pageSections[2].sectionSubtitle ?? "");
        } else {
          alert(response.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
    if (editedTestimonials.size > 0) {
      const updateArray: string[][] = [];
      for (const elem of testimonialData) {
        updateArray.push([elem.title, elem.description]);
      }
      setTestimonialArray(updateArray);
    }
    setIsEdited(false);
  };

  const handleAdd = () => {
    console.log("Add Testimonial");
    setTestimonialArray([
      ...testimonialArray,
      ["", ""], // and one new item at the end
    ]);
    editedTestimonials.add(testimonialArray.length); //Add index to list of edited indices
    alert(testimonialArray.length);
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
        pages={["Our Impact", "Testimonials", "Newsletter"]}
        links={["./impact", "./testimonials", "./newsletter"]}
        currPage={1}
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
          title="Section 1"
          subsection={["Section Title", "Subtitle"]}
          textbox={[s1Subtitle, s1Text]}
          listTitles={["Testimonial Header", "Testimonial Description"]}
          listText={testimonialArray}
          onChange={handleEdit}
        />
        <button className={styles.addButton} onClick={handleAdd}>
          Add Testimonial
        </button>
        <Collapsable
          title="Section 2"
          subsection={["Section Title", "Subtitle"]}
          textbox={[s2Title, s2Subtitle]}
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
