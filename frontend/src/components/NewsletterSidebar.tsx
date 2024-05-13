"use client";
import Image from "next/image";
import React, { useState } from "react";

import { CreateNewsletterRequest, Newsletter, deleteNewsletter } from "../api/newsletter";

import styles from "./NewsletterSidebar.module.css";

import AlertBanner from "@/components/AlertBanner";
import { TextField } from "@/components/TextField";
import { WarningModule } from "@/components/WarningModule";

type newsletterSidebarProps = {
  newsletter: null | Newsletter;
  setSidebarOpen: (open: boolean) => void;
  updateNewsletter: (newsletterData: Newsletter) => void;
  createNewsletter: (newsletterData: CreateNewsletterRequest) => void;
};

type formErrors = {
  title?: boolean;
  description?: boolean;
  date?: boolean;
  content?: boolean;
};

const NewsletterSidebar = ({
  newsletter,
  setSidebarOpen,
  updateNewsletter,
  createNewsletter,
}: newsletterSidebarProps) => {
  const [title, setTitle] = useState(newsletter ? newsletter.title : "");
  const [description, setDescription] = useState(newsletter ? newsletter.description : "");
  const [date, setDate] = useState(newsletter ? newsletter.date : "");
  const [content, setContent] = useState(newsletter ? newsletter.content : "");
  const [isEditing, setIsEditing] = useState<boolean>(!newsletter);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [errors, setErrors] = useState<formErrors>({});
  const [warningOpen, setWarningOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const confirmCancel = () => {
    setTitle(newsletter ? newsletter.title : "");
    setDescription(newsletter ? newsletter.description : "");
    setDate(newsletter ? newsletter.date : "");
    setContent(newsletter ? newsletter.content : "");
    setIsEditing(false);
    setIsDeleting(false);
    setErrors({});
    setWarningOpen(false);
    setSidebarOpen(false);
  };

  const handleCancel = () => {
    if (
      title !== (newsletter ? newsletter.title : "") ||
      description !== (newsletter ? newsletter.description : "") ||
      date !== (newsletter ? newsletter.date : "") ||
      content !== (newsletter ? newsletter.content : [])
    ) {
      setWarningOpen(true);
    } else {
      confirmCancel();
    }
  };

  const handleCloseSidebar = () => {
    if (
      title !== (newsletter ? newsletter.title : "") ||
      description !== (newsletter ? newsletter.description : "") ||
      date !== (newsletter ? newsletter.date : "") ||
      content !== (newsletter ? newsletter.content : [])
    ) {
      setWarningOpen(true);
    } else {
      confirmCancel();
      setSidebarOpen(false);
    }
  };

  const handleSave = () => {
    setWarningOpen(false);
    if (title === "" || description === "" || date === "" || content.length === 0) {
      setErrors({
        title: title === "",
        description: description === "",
        date: date === "",
        content: content.length === 0,
      });
    } else {
      setIsEditing(false);
      if (newsletter) {
        updateNewsletter({
          _id: newsletter._id,
          image: newsletter.image,
          title,
          description,
          date,
          content,
        });
      } else {
        createNewsletter({
          image: "/newsletter2.png",
          title,
          description,
          date,
          content,
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
    if (newsletter) {
      deleteNewsletter(newsletter._id)
        .then((result) => {
          if (result.success) {
            console.log("successful deletion");
          } else {
            console.error("ERROR:", result.error);
          }
        })
        .catch((error) => {
          alert(error);
        });
      setSidebarOpen(false);
      window.location.reload();
    }
  };

  const alertContent = {
    text: "Newsletter Saved!",
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
            <h1>Newsletter Details</h1>

            {/* Edit button */}
            <button
              onClick={() => {
                setIsEditing(true);
                console.log("isEditing:", isEditing);
              }}
              className={styles.editButton}
            >
              <Image src="/ic_edit.svg" alt="Add Icon" width={24} height={24} />
              <p>Edit</p>
            </button>
          </div>
          <h2>Newsletter Title</h2>
          <p>{title}</p>
          <h2>Newsletter Description</h2>
          <p>{description}</p>
          <h2>Date & Time</h2>
          <p>{date}</p>
          <h2>Newsletter Cover</h2>
          <p>Placeholder - to be replaced with image</p>
          <h2>Newsletter Content</h2>
          <pre className={styles.content}>{content}</pre>
          {/* Delete button */}

          <div className={styles.deleteButtonWrapper}>
            <button onClick={handleDelete} className={styles.deleteButton}>
              <p>Delete</p>
            </button>
          </div>
          <div className={styles.grayOut}></div>
          <WarningModule
            titleText="Are you sure you want to delete this newsletter?"
            subtitleText="This action is permanent and cannot be undone."
            cancelText="No, cancel"
            actionText="Delete newsletter"
            cancel={confirmCancel}
            action={confirmDelete}
            onClose={confirmCancel}
          />
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className={styles.sidebar}>
        {warningOpen && <div className={styles.grayOut}></div>}
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
            <h1>Newsletter Details</h1>
          </div>
          <form>
            <div className={styles.formRow}>
              <TextField
                className={styles.textField}
                label="Newsletter Title"
                value={title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(event.target.value);
                }}
                error={errors.title}
              />
              <TextField
                className={`${styles.textField} ${styles.stretch}`}
                label="Newsletter Description"
                value={description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDescription(event.target.value);
                }}
                error={errors.description}
              />
              <TextField
                className={`${styles.textField} ${styles.stretch}`}
                label="Date & Time"
                value={date}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDate(event.target.value);
                }}
                error={errors.date}
              />
              <h2>Newsletter Cover</h2>
              <p>Placeholder - to be replaced with image</p>
              <h2>Newsletter Content</h2>
              <textarea
                id="textarea"
                className={`${styles.textArea} ${styles.stretch}`}
                value={content}
                onChange={(event) => {
                  console.log("onChange");
                  setContent(event.target.value);
                }}
              />
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
            <h1>Newsletter Details</h1>

            {/* Edit button */}
            <button
              onClick={() => {
                setIsEditing(true);
                console.log("isEditing:", isEditing);
              }}
              className={styles.editButton}
            >
              <Image src="/ic_edit.svg" alt="Add Icon" width={24} height={24} />
              <p>Edit</p>
            </button>
          </div>
          <h2>Newsletter Title</h2>
          <p>{title}</p>
          <h2>Newsletter Description</h2>
          <p>{description}</p>
          <h2>Date & Time</h2>
          <p>{date}</p>
          <h2>Newsletter Cover</h2>
          <p>Placeholder - to be replaced with image</p>
          <h2>Newsletter Content</h2>
          <pre className={styles.content}>{content}</pre>
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

export default NewsletterSidebar;
