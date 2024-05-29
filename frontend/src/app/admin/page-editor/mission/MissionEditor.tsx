import React, { useEffect, useState } from "react";

import { getPageData, updatePageData } from "../../../../api/pageeditor";
import Toast from "../../../../components/admin/Toast";
import CancelButton from "../../../../components/admin/pageeditor/CancelButton";
import { CollapsibleFields } from "../../../../components/admin/pageeditor/CollapsibleFields";
import { usePage, usePageDispatch } from "../../../../components/admin/pageeditor/PageProvider";
import SaveButton from "../../../../components/admin/pageeditor/SaveButton";

import styles from "./page.module.css";

export default function MissionEditor() {
  const page = usePage();
  const dispatch = usePageDispatch();
  const [open, setOpen] = useState(false);

  // Send page data from MongoDB to provider state
  const updatePageStateFromDB = () => {
    getPageData(page.name)
      .then((response) => {
        if (response.success) {
          dispatch({
            type: "edit_page",
            setIsEdited: false,
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

  // When the page loads update state to reflect page data from MongoDB
  useEffect(() => {
    updatePageStateFromDB();
  }, []);

  // Implement save logic
  const handleSave = () => {
    if (page.isEdited) {
      // set isEdited to false or else when we load from mongo it will have wrong state
      updatePageData(page.name, { ...page, isEdited: false })
        .then(() => {
          setOpen(true);
        })
        .catch((error) => {
          alert(error);
        });
      dispatch({
        type: "set_isEdited",
        setIsEdited: false,
      });
    }
  };

  // Implement cancel logic
  const handleCancel = () => {
    if (page.isEdited) {
      updatePageStateFromDB();
      dispatch({
        type: "set_isEdited",
        setIsEdited: false,
      });
    }
  };

  return (
    <div>
      <Toast
        message="Event Details Saved!"
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
      <div className={styles.sectionContainer}>
        <CollapsibleFields
          title="Page Subtitle"
          fieldNames={["Subtitle", "Header Image Carousel"]}
        />
        <CollapsibleFields
          title="Section 1"
          fieldNames={[
            "Values Section Title",
            "Value #1",
            "Value #1 Description",
            "Value #2",
            "Value #2 Description",
            "Value #3",
            "Value #3 Description",
          ]}
        />
        <CollapsibleFields
          title="Section 2"
          fieldNames={["Story Section Title", "Body Text", "Image Gallery"]}
        />
        <div className={styles.buttonContainer}>
          <CancelButton text="Cancel" onClick={handleCancel} />
          <SaveButton text="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
}
