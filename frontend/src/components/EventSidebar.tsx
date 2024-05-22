"use client";
import Image from "next/image";
import React, { useState } from "react";

import { CreateEventDetailsRequest, EventDetails, deleteEventDetails } from "../api/eventDetails";

import styles from "./EventSidebar.module.css";

import AlertBanner from "@/components/AlertBanner";
import { TextField } from "@/components/TextField";
import { WarningModule } from "@/components/WarningModule";

type eventSidebarProps = {
  eventDetails: null | EventDetails;
  setSidebarOpen: (open: boolean) => void;
  updateEvent: (eventData: EventDetails) => boolean;
  createEvent: (eventData: CreateEventDetailsRequest) => boolean;
};

type formErrors = {
  name?: boolean;
  description?: boolean;
  description_short?: boolean;
  guidelines?: boolean;
  date?: boolean;
  location?: boolean;
};

const EventSidebar = ({
  eventDetails,
  setSidebarOpen,
  updateEvent,
  createEvent,
}: eventSidebarProps) => {
  const [name, setName] = useState(eventDetails ? eventDetails.name : "");
  const [description, setDescription] = useState(eventDetails ? eventDetails.description : "");
  const [description_short, setDescription_short] = useState(eventDetails ? eventDetails.description_short : "");
  const [date, setDate] = useState(eventDetails ? eventDetails.date : "");
  const [location, setLocation] = useState(eventDetails ? eventDetails.location : "");
  const [guidelines, setGuidelines] = useState(eventDetails ? eventDetails.guidelines : "");
  const [isEditing, setIsEditing] = useState<boolean>(!eventDetails);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [errors, setErrors] = useState<formErrors>({});
  const [warningOpen, setWarningOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const confirmCancel = () => {
    setName(eventDetails ? eventDetails.name : "");
    setDescription(eventDetails ? eventDetails.description : "");
    setDescription_short(eventDetails ? eventDetails.description_short : "");
    setDate(eventDetails ? eventDetails.date : "");
    setLocation(eventDetails ? eventDetails.location : "");
    setGuidelines(eventDetails ? eventDetails.guidelines : "");
    setIsEditing(false);
    setIsDeleting(false);
    setErrors({});
    setWarningOpen(false);
    setSidebarOpen(false);
  };

  const handleCancel = () => {
    if (
      name !== (eventDetails ? eventDetails.name : "") ||
      description !== (eventDetails ? eventDetails.description : "") ||
      description_short !== (eventDetails ? eventDetails.description_short : "") ||
      date !== (eventDetails ? eventDetails.date : "") ||
      location !== (eventDetails ? eventDetails.location : "") ||
      guidelines !== (eventDetails ? eventDetails.guidelines : "")
    ) {
      setWarningOpen(true);
    } else {
      confirmCancel();
    }
  };

  const handleCloseSidebar = () => {
    if (
      name !== (eventDetails ? eventDetails.name : "") ||
      description !== (eventDetails ? eventDetails.description : "") ||
      description_short !== (eventDetails ? eventDetails.description_short : "") ||
      date !== (eventDetails ? eventDetails.date : "") ||
      location !== (eventDetails ? eventDetails.location : "") ||
      guidelines !== (eventDetails ? eventDetails.guidelines : "")
    ) {
      setWarningOpen(true);
    } else {
      confirmCancel();
      setSidebarOpen(false);
    }
  };

  const handleSave = () => {
    setWarningOpen(false);

    if (
      name === "" ||
      description === "" ||
      description_short === "" ||
      date === "" ||
      location === "" ||
      guidelines === ""
    ) {
      setErrors({
        name: name === "",
        description: description === "",
        description_short: description_short === "",
        date: date === "",
        location: location === "",
        guidelines: guidelines === "",
      });
    } else {
      setIsEditing(false);
      if (eventDetails) {
        
        updateEvent({
          _id: eventDetails._id,
          name,
          description,
          guidelines,
          date,
          location,
          imageURI: eventDetails.imageURI,
          description_short
        });
      } else {
        
        createEvent({
          name,
          description,
          guidelines,
          date,
          location,
          imageURI: "https://tse.ucsd.edu/assets/images/icons__tse-bulb__128.png",
          description_short,
        });
      }
      setIsEditing(false);
      setErrors({});
      setShowAlert(true);
      window.location.reload();
    
    }
  
    
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const confirmDelete = () => {
    if (eventDetails) {
      console.log(eventDetails._id)

      deleteEventDetails(eventDetails._id)
        .then((result) => {
          if (result.success) {
            console.log("successful deletion");
            window.location.reload();
          } else {
            console.error("ERROR:", result.error);
          }
        })
        .catch((error) => {
          alert(error);
        });
      setSidebarOpen(false);
      
    }
  };

  const alertContent = {
    text: "Event Saved!",
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if (isDeleting) {
    return (
      <div className={styles.sidebar}>
        <div className={styles.alert}>
          {showAlert && <AlertBanner text={alertContent.text} onClose={handleCloseAlert} />}
        </div>
        <div
          className={styles.closeWindow}
          onClick={() => {
            setSidebarOpen(false);
          }}
        >
          <Image src="/ic_doublecaretright.svg" alt="test" width={24} height={24} />
          <p>Close Window</p>
        </div>
        <div className={styles.sidebarContents}>
          <div className={styles.header}>
            <h1>Event Details</h1>

            {/* Edit button */}
            <button
              onClick={() => {
                setIsEditing(true);
              }}
              className={styles.editButton}
            >
              <Image src="/ic_edit.svg" alt="Add Icon" width={24} height={24} />
              <p>Edit</p>
            </button>
          </div>
          <h2>Event Title</h2>
          <p>{name}</p>
          <h2>Event Description (short)</h2>
          <pre className={styles.textAreaContent}>{description_short}</pre>
          <h2>Event Description (long)</h2>
          <pre className={styles.textAreaContent}>{description}</pre>
          <h2>Date & Time</h2>
          <p>{date}</p>
          <h2>Location</h2>
          <p>{location}</p>
          <h2>Guidelines</h2>
          <pre className={styles.textAreaContent}>{guidelines}</pre>
          <h2>Image</h2>
          <p>Placeholder - to be replaced with image</p>

          {/* Delete button */}

          <div className={styles.deleteButtonWrapper}>
            <button onClick={handleDelete} className={styles.deleteButton}>
              <p>Delete</p>
            </button>
          </div>
          <div className={styles.fixedPosition}>
            <div className={styles.grayOut}></div>
            <WarningModule
              titleText="Are you sure you want to delete this event?"
              subtitleText="This action is permanent and cannot be undone."
              cancelText="No, cancel"
              actionText="Delete event"
              cancel={confirmCancel}
              action={confirmDelete}
              onClose={confirmCancel}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className={styles.sidebar}>
        {warningOpen && (
          <div className={styles.fixedPosition}>
            <div className={styles.grayOut}></div>
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
          </div>
        )}
        <div
          className={styles.closeWindow}
          onClick={() => {
            handleCloseSidebar();
          }}
        >
          <Image src="/ic_doublecaretright.svg" alt="test" width={24} height={24} />
          <p>Close Window</p>
        </div>
        <div className={styles.sidebarContents}>
          <div className={styles.header}>
            <h1>Event Details</h1>
          </div>
          <form>
            <div className={styles.formRow}>
              <TextField
                className={styles.textField}
                label="Event Title"
                placeholder="Event Title"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                  
                }}
                error={errors.name}
              />
              <h2>Event Description (short)</h2>
              <textarea
                id="description_short"
                className={`${styles.textArea} ${styles.stretch}`}
                placeholder="This is a short description of your event that will be displayed on the event page."
                value={description_short}
                onChange={(event) => {
                  setDescription_short(event.target.value);
                }}
              />
              <h2>Event Description (long)</h2>
              <textarea
                id="description"
                className={`${styles.textAreaLong} ${styles.stretch}`}
                placeholder = "This is a long description of your event that will be displayed on the event page."
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
              <TextField
                className={`${styles.textField} ${styles.stretch}`}
                label="Date & Time (Month DD, YYYY, HH:MM-HH:MM)"
                value={date}
                placeholder = "Example: December 24, 2024, 9:00-10:00"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDate(event.target.value);
                }}
                error={errors.date}
              />
              <TextField
                className={`${styles.textField} ${styles.stretch}`}
                label="Location"
                value={location}
                placeholder = "Where will this event take place?"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLocation(event.target.value);
                }}
                error={errors.location}
              />
              <h2>Guidelines</h2>
              <textarea
                id="guidelines"
                className={`${styles.textArea} ${styles.stretch}`}
                placeholder = "This is a description of your event guidelines (dress codes, materials, qualifications, etc.)"

                value={guidelines}
                onChange={(event) => {
                  setGuidelines(event.target.value);
                }}
              />
              <h2>Image</h2>
              <p>Placeholder - to be replaced with image</p>
            </div>
          </form>
        </div>
        <div className={styles.bottomButtons}>
          {/* Cancel button */}
          <button onClick={handleCancel} className={styles.cancelButton}>
            <p>Cancel</p>
          </button>
          {/* Save button */}
          <button onClick={handleSave} className={styles.saveButton}>
            <p>Save</p>
          </button>
        </div>
      </div>
    );

    //if is deleting
  } else {
    // not in edit mode
    return (
      <div className={styles.sidebar}>
        <div className={styles.alert}>
          {showAlert && <AlertBanner text={alertContent.text} onClose={handleCloseAlert} />}
        </div>
        <div
          className={styles.closeWindow}
          onClick={() => {
            setSidebarOpen(false);
          }}
        >
          <Image src="/ic_doublecaretright.svg" alt="test" width={24} height={24} />
          <p>Close Window</p>
        </div>
        <div className={styles.sidebarContents}>
          <div className={styles.header}>
            <h1>Event Details</h1>

            {/* Edit button */}
            <button
              onClick={() => {
                setIsEditing(true);
              }}
              className={styles.editButton}
            >
              <Image src="/ic_edit.svg" alt="Add Icon" width={24} height={24} />
              <p>Edit</p>
            </button>
          </div>
          <h2>Event Title</h2>
          <p>{name}</p>
          <h2>Event Description (short)</h2>
          <pre className={styles.textAreaContent}>{description_short}</pre>
          <h2>Event Description (long)</h2>
          <pre className={styles.textAreaContent}>{description}</pre>
          <h2>Date & Time</h2>
          <p>{date}</p>
          <h2>Location</h2>
          <p>{location}</p>
          <h2>Guidelines</h2>
          <pre className={styles.textAreaContent}>{guidelines}</pre>
          <h2>Image</h2>
          <p>Placeholder - to be replaced with image</p>

          {/* Delete button */}
          <div className={styles.deleteButtonWrapper}>
            <button onClick={handleDelete} className={styles.deleteButton}>
              <p>Delete</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default EventSidebar;
