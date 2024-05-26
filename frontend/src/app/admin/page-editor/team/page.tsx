"use client";
import React, { useEffect, useState } from "react";

import { Member, createMember, getAllMembers, updateMember, deleteMember } from "../../../../api/member";
import { getPageText, updatePage } from "../../../../api/pageeditor";
import styles from "../testimonials/page.module.css";

import AlertBanner from "@/components/AlertBanner";
import Button from "@/components/Button";
import CancelButton from "@/components/CancelButton";
import Collapsable from "@/components/Collapsable";
import PageToggle from "@/components/PageToggle";
import { WarningModule } from "@/components/WarningModule";

// import PageEditorCard from "@/components/PageEditorCard";

export default function TeamEditor() {
  const [members, setMembers] = useState<Member[]>([]);
  const [membersArray, setMembersArray] = useState<string[][]>([]);
  const [editedMembers] = useState<Set<number>>(new Set()); //Indices of edited testimonials

  const [isEdited, setIsEdited] = useState(false);
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");

  const [showAlert, setShowAlert] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  /* Get page data from MongoDB */
  let pageText;
  useEffect(() => {
    getPageText("Our Team")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
        } else {
          alert(response.error);
        }
      })
      .catch((error) => {
        alert(error);
      });

    getAllMembers()
      .then((response2) => {
        if (response2.success) {
          setMembers(response2.data);
          const newArray: string[][] = [];
          for (const elem of response2.data) {
            newArray.push([elem.name, elem.role]);
          }
          setMembersArray(newArray);
        } else {
          alert(response2.error);
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
    } else if (event.target.id.includes("Staff Name")) {
      const memberIndex = Number(event.target.id.slice(event.target.id.indexOf(":") + 2));
      const updateArray = membersArray.map((elem, index) => {
        if (index === memberIndex) {
          return [event.target.value, elem[1]];
        } else {
          return elem;
        }
      });
      setMembersArray(updateArray);
      editedMembers.add(memberIndex);
    } else if (event.target.id.includes("Staff Position")) {
      const memberIndex = Number(event.target.id.slice(event.target.id.indexOf(":") + 2));
      //Update textarea by changing testimonialArray element
      const updateArray = membersArray.map((elem, index) => {
        if (index === memberIndex) {
          return [elem[0], event.target.value];
        } else {
          return elem;
        }
      });
      setMembersArray(updateArray);
      editedMembers.add(memberIndex); //Add index to list of edited indices
    }
  };

  const handleSave = () => {
    // Implement save logic
    if (isEdited) {
      console.log("save in team");
      updatePage({
        //Pass edited text to MongoDB
        page: "Our Team",
        pageSections: [
          {
            subtitle: phSubtitle,
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

      if (editedMembers.size > 0) {
        for (const index of Array.from(editedMembers)) {
          if (index >= members.length) {
            createMember({
              name: membersArray[index][0],
              role: membersArray[index][1],
              // profilePictureURL: "/impact1.png"
            })
              .then((response2) => {
                if (response2.success) {
                  setShowAlert(true);
                } else {
                  alert(response2.error);
                }
              })
              .catch((error) => {
                alert(error);
              });
          } else {
            members[index].name = membersArray[index][0];
            members[index].role = membersArray[index][1];
            updateMember(members[index])
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

      for(let index = 0; index < membersArray.length; index++) {
        const name = membersArray[index][0];
        const role = membersArray[index][1];
        if (name === "" && role === "") {
          deleteMember(members[index])
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
    getPageText("Our Team")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
        } else {
          alert(response.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
    if (editedMembers.size > 0) {
      const updateArray: string[][] = [];
      for (const elem of members) {
        updateArray.push([elem.name, elem.role]);
      }
      setMembersArray(updateArray);
    }
    setIsEdited(false);
  };

  const handleAdd = () => {
    console.log("Add Volunteer");
    setMembersArray([...membersArray, ["", ""]]);
    editedMembers.add(members.length);
    setIsEdited(true);
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
        pages={["About Us", "Our Mission", "Our Team", "Contact Us"]}
        links={["./about", "./mission", "./team", "./contact"]}
        currPage={2}
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
          subsection={["Section Title", "Body Text"]}
          textbox={[s1Subtitle, s1Text]}
          onChange={handleEdit}
        />
        <Collapsable
          title="Section 2"
          listTitles={["Staff Name", "Staff Position"]}
          listText={membersArray}
          onChange={handleEdit}
          isAdjacent={true}
        />

        <button className={styles.addButton} onClick={handleAdd}>
          Add Staff
        </button>

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
