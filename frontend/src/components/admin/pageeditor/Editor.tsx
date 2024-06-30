"use client";

import { ReactNode, useEffect, useState } from "react";

import { getPageData, updatePageData } from "../../../api/pageeditor";
import { updateRecord } from "../../../api/records";
import { WarningModule } from "../../../components/WarningModule";
import Toast from "../Toast";

import CancelButton from "./CancelButton";
import { CollapsibleFields } from "./CollapsibleFields";
import styles from "./Editor.module.css";
import { usePage, usePageDispatch } from "./PageProvider";
import SaveButton from "./SaveButton";

export type Section = {
  title: string;
  fieldNames: string[];
};

export type EditorProps = {
  sections: Section[];
  onSave?: () => void;
  onCancel?: () => void;
  childIdx?: number;
  children?: ReactNode;
};

export default function Editor({ sections, onSave, onCancel, childIdx, children }: EditorProps) {
  const page = usePage();
  const dispatch = usePageDispatch();
  const [alertOpen, setAlertOpen] = useState(false);
  const pageName = page.name.charAt(0).toUpperCase() + page.name.slice(1);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const setPageFromDB = () => {
    // load page from mongodb
    getPageData(page.name)
      .then((response) => {
        if (response.success) {
          dispatch({
            type: "edit_page",
            page: {
              ...page,
              fields: response.data.fields,
            },
          });
        } else {
          alert("Could not connect to database. Any changes you make will not take effect!!!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    setPageFromDB();
  }, []);

  const handleSave = () => {
    if (onSave) onSave();
    if (page.isEdited) {
      // if save listener exists, call it
      // set mongodb page to local page
      updatePageData(page.name, { ...page, isEdited: false })
        .then(() => {
          setAlertOpen(true);
        })
        .catch(console.error);
      // page is no longer edited
      dispatch({
        type: "set_isEdited",
        setIsEdited: false,
      });
      // update edited timestamp
      updateRecord(page.name).catch(console.error);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    if (page.isEdited) {
      // if cancel listener exists, call it
      // overwrite local changes with mongodb page
      setPageFromDB();
      // page is no longer edited
      dispatch({
        type: "set_isEdited",
        setIsEdited: false,
      });
    }
  };

  // if childIdx is defined, children nodes will be rendered in between sections at that index
  const showChildrenAtIdx = childIdx ? childIdx : -1;
  return (
    <div className={styles.sectionContainer}>
      <Toast message={`${pageName} Page Saved!`} open={alertOpen} handleClose={handleCloseAlert} />
      {sections.map((section, idx) => (
        <div key={`${section.title}@${idx}`}>
          {showChildrenAtIdx === idx && children}
          <CollapsibleFields title={section.title} fieldNames={section.fieldNames} />
        </div>
      ))}
      {showChildrenAtIdx === -1 && children}
      <div className={styles.buttonContainer}>
        <WarningModule
          titleText="You have unsaved changes!"
          subtitleText="Do you want to save the changes you made to this event?"
          cancelText="Discard changes"
          actionText="Save changes"
          cancel={handleCancel}
          action={handleSave}
        >
          <CancelButton text="Cancel" />
        </WarningModule>
        <SaveButton text="Save" onClick={handleSave} />
      </div>
    </div>
  );
}
