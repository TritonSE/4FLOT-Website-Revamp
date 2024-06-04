"use client";
import Image from "next/image";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { CreateEventDetailsRequest, EventDetails, deleteEventDetails } from "../api/eventDetails";

import styles from "./EventSidebar.module.css";
import { TextAreaCharLimit } from "./TextAreaCharLimit";
import { TextFieldCharLimit } from "./TextFieldCharLimit";

import AlertBanner from "@/components/AlertBanner";
import { TextField } from "@/components/TextField";
import { WarningModule } from "@/components/WarningModule";

type eventSidebarProps = {
  eventDetails: null | EventDetails;
  setSidebarOpen: (open: boolean) => void;
  updateEvent: (eventData: EventDetails) => Promise<void>;
  createEvent: (eventData: CreateEventDetailsRequest) => Promise<void>;
};

type formErrors = {
  name?: boolean;
  description?: boolean;
  description_short?: boolean;
  guidelines?: boolean;
  date?: boolean;
  startTime?: boolean;
  endTime?: boolean;
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
  const [description_short, setDescription_short] = useState(
    eventDetails ? eventDetails.description_short : "",
  );
  const [date, setDate] = useState(eventDetails ? new Date(eventDetails.date) : new Date());
  const [startTime, setStartTime] = useState(eventDetails ? eventDetails.startTime : "");
  const [endTime, setEndTime] = useState(eventDetails ? eventDetails.endTime : "");

  const [location, setLocation] = useState(eventDetails ? eventDetails.location : "");
  const [guidelines, setGuidelines] = useState(eventDetails ? eventDetails.guidelines : "");
  const [isEditing, setIsEditing] = useState<boolean>(!eventDetails);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [errors, setErrors] = useState<formErrors>({});
  const [warningOpen, setWarningOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // useEffect(() => {
  //   if (date && startTime && endTime) {
  //     const [startHour, startMinute] = startTime.split(":");
  //     const [endHour, endMinute] = endTime.split(":");
  //     const updatedStartDate = new Date(date);
  //     const updatedEndDate = new Date(date);

  //     updatedStartDate.setHours(parseInt(startHour), parseInt(startMinute));
  //     updatedEndDate.setHours(parseInt(endHour), parseInt(endMinute));

  //     setDate(updatedStartDate);
  //     setEndTime(
  //       updatedEndDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  //     );
  //   }
  // }, [startTime, endTime]);

  const confirmCancel = () => {
    setName(eventDetails ? eventDetails.name : "");
    setDescription(eventDetails ? eventDetails.description : "");
    setDescription_short(eventDetails ? eventDetails.description_short : "");
    setDate(eventDetails ? new Date(eventDetails.date) : new Date());
    setStartTime(eventDetails ? eventDetails.startTime : "");
    setEndTime(eventDetails ? eventDetails.endTime : "");
    setLocation(eventDetails ? eventDetails.location : "");
    setGuidelines(eventDetails ? eventDetails.guidelines : "");
    setIsEditing(false);
    setIsDeleting(false);
    setErrors({});
    setWarningOpen(false);
    setSidebarOpen(false);
  };

  const handleCancel = () => {
    const defaultDate = new Date();
    if (
      name !== (eventDetails ? eventDetails.name : "") ||
      description !== (eventDetails ? eventDetails.description : "") ||
      description_short !== (eventDetails ? eventDetails.description_short : "") ||
      date !== (eventDetails ? new Date(eventDetails.date) : defaultDate) ||
      startTime !== (eventDetails ? eventDetails.startTime : "") ||
      endTime !== (eventDetails ? eventDetails.endTime : "") ||
      location !== (eventDetails ? eventDetails.location : "") ||
      guidelines !== (eventDetails ? eventDetails.guidelines : "")
    ) {
      setWarningOpen(true);
    } else {
      confirmCancel();
    }
  };

  const handleCloseSidebar = () => {
    const defaultDate = new Date();
    if (
      name !== (eventDetails ? eventDetails.name : "") ||
      description !== (eventDetails ? eventDetails.description : "") ||
      description_short !== (eventDetails ? eventDetails.description_short : "") ||
      date !== (eventDetails ? new Date(eventDetails.date) : defaultDate) ||
      startTime !== (eventDetails ? eventDetails.startTime : "") ||
      endTime !== (eventDetails ? eventDetails.endTime : "") ||
      location !== (eventDetails ? eventDetails.location : "") ||
      guidelines !== (eventDetails ? eventDetails.guidelines : "")
    ) {
      setWarningOpen(true);
    } else {
      confirmCancel();
      setSidebarOpen(false);
    }
  };

  const handleSave = async () => {
    setWarningOpen(false);
    console.log("handleSave");

    if (
      name === "" ||
      description === "" ||
      description_short === "" ||
      !date ||
      startTime === "" ||
      endTime === "" ||
      location === "" ||
      guidelines === ""
    ) {
      setErrors({
        name: name === "",
        description: description === "",
        description_short: description_short === "",
        date: !date,
        startTime: startTime === "",
        endTime: endTime === "",
        location: location === "",
        guidelines: guidelines === "",
      });
    } else {
      setIsEditing(false);
      if (eventDetails) {
        console.log("eventDetails exist");
        await updateEvent({
          _id: eventDetails._id,
          name,
          description,
          guidelines,
          date: date.toISOString(),
          startTime,
          endTime,
          location,
          imageURI: eventDetails.imageURI,
          description_short,
        });
        console.log("after updating event");
      } else {
        await createEvent({
          name,
          description,
          guidelines,
          date: date.toISOString(),
          startTime,
          endTime,
          location,
          imageURI:
            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description_short,
        });
        console.log("after creating event");
      }

      setIsEditing(false);
      setErrors({});
      setShowAlert(true);
      window.location.reload();
      console.log("last line in save");
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const confirmDelete = () => {
    if (eventDetails) {
      deleteEventDetails(eventDetails._id)
        .then((result) => {
          if (result.success) {
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
          <p>{`${date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}, ${startTime} - ${endTime}`}</p>
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
              <TextFieldCharLimit
                className={styles.textField}
                label="Event Title"
                placeholder="Event Title"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
                error={errors.name}
                maxCount={35}
              />
              <h2>Event Description (short)</h2>
              <TextAreaCharLimit
                id="description_short"
                className={`${styles.textArea} ${styles.stretch}`}
                placeholder="This is a short description of your event that will be displayed on the event page."
                value={description_short}
                onChange={(event) => {
                  setDescription_short(event.target.value);
                }}
                maxCount={200}
              />
              <h2>Event Description (long)</h2>
              <TextAreaCharLimit
                id="description"
                className={`${styles.textAreaLong} ${styles.stretch}`}
                placeholder="This is a long description of your event that will be displayed on the event page."
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                maxCount={275}
              />
              <div className={styles.textField}>
                <DatePicker
                  selected={date}
                  onChange={(dateObj: Date) => {
                    setDate(dateObj);
                  }}
                  dateFormat="MMMM d, yyyy"
                  customInput={
                    <TextField
                      className={`${styles.textFieldSmall} ${styles.stretch}`}
                      label="Date & Time"
                      value={
                        date
                          ? `${date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}, ${startTime}-${endTime}`
                          : ""
                      }
                      placeholder="Select date and time"
                    />
                  }
                />
                {errors.date && <p className={styles.error}>Date is required</p>}
              </div>
              <div style={{ display: "flex", width: "240px" }}>
                <div style={{ width: "100px" }}>
                  <TextField
                    className={styles.textFieldSmallest}
                    label="Start Time"
                    value={startTime}
                    placeholder="Start Time"
                    style={{ width: "100px" }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setStartTime(event.target.value);
                    }}
                  />
                </div>
                <p
                  style={{
                    marginTop: "50px",
                    marginLeft: "10px",
                    marginRight: "10px",
                    flexGrow: "1",
                  }}
                >
                  to
                </p>
                <div style={{ width: "100px" }}>
                  <TextField
                    className={styles.textFieldSmallest}
                    label="End Time"
                    value={endTime}
                    placeholder="End Time"
                    style={{ width: "100px" }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setEndTime(event.target.value);
                    }}
                  />
                </div>
              </div>
              <TextField
                className={`${styles.textField} ${styles.stretch}`}
                label="Location"
                value={location}
                placeholder="Where will this event take place?"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLocation(event.target.value);
                }}
                error={errors.location}
              />
              <h2>Guidelines</h2>
              <textarea
                id="guidelines"
                className={`${styles.textArea} ${styles.stretch}`}
                placeholder="This is a description of your event guidelines (dress codes, materials, qualifications, etc.)"
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
        {warningOpen && (
          <div className={styles.fixedPosition}>
            <div className={styles.grayOut}></div>
            <div className={styles.warningModule}>
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
          </div>
        )}
      </div>
    );
  } else {
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
          <p>{`${date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}, ${startTime} - ${endTime}`}</p>
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
