"use client";
import Image from "next/image";
import React, { useState } from "react";

import { CreateNewsletterRequest, Newsletter, deleteNewsletter } from "../api/newsletter";

import AlertBanner from "./AlertBanner";
import styles from "./NewsletterSidebar.module.css";
import { TextField } from "./TextField";
import { WarningModule } from "./WarningModule";
import SimpleImageDropzone from "./admin/storage/SimpleImageDropzone";

import { deleteFile } from "@/app/admin/util/pageeditUtil";
import { TextArea } from "./TextArea";

type newsletterSidebarProps = {
  newsletter: null | Newsletter;
  setSidebarOpen: (open: boolean) => void;
  updateNewsletter: (newsletterData: Newsletter) => Promise<void>;
  createNewsletter: (newsletterData: CreateNewsletterRequest) => Promise<void>;
};

type formErrors = {
  title?: boolean;
  description?: boolean;
  date?: boolean;
  image?: boolean;
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
  const [image, setImage] = useState(newsletter ? newsletter.image : "");
  const [content, setContent] = useState(newsletter ? newsletter.content : "");
  const [isEditing, setIsEditing] = useState<boolean>(!newsletter);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [errors, setErrors] = useState<formErrors>({});
  const [showAlert, setShowAlert] = useState(false);

  const confirmCancel = () => {
    setTitle(newsletter ? newsletter.title : "");
    setDescription(newsletter ? newsletter.description : "");
    setDate(newsletter ? newsletter.date : "");
    setImage(newsletter ? newsletter.image : "");
    setContent(newsletter ? newsletter.content : "");
    setIsEditing(false);
    setIsDeleting(false);
    setErrors({});
    setSidebarOpen(false);
  };

  const handleSave = async () => {
    if (title === "" || description === "" || date === "" || image === "" || content.length === 0) {
      setErrors({
        title: title === "",
        description: description === "",
        date: date === "",
        image: image === "",
        content: content.length === 0,
      });
    } else {
      setIsEditing(false);
      if (newsletter) {
        await updateNewsletter({
          _id: newsletter._id,
          title,
          description,
          date,
          image,
          content,
        });
      } else {
        await createNewsletter({
          title,
          description,
          date,
          image,
          content,
        });
      }
      setIsEditing(false);
      setErrors({});
      setShowAlert(true);
      window.location.reload();
    }
  };

  // handle changing url on newsletter to "" if user deletes image
  const onImageDelete = () => {
    setImage("");
    // immediately update newsletter, can't undo image delete
    if (newsletter) {
      updateNewsletter({
        ...newsletter,
        image: "",
      });
    }
  };

  // handle updating image on image dropzone upload
  const onImageUpload = (url: string) => {
    // can't undo image upload, save immediately
    if (newsletter) {
      updateNewsletter({
        ...newsletter,
        image: url,
      });
    }
  };

  const handleDelete = () => {
    if (newsletter) {
      // delete image from firebase
      deleteFile(image).catch(console.error);
      // delete newsletter
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
          <SimpleImageDropzone
            folder="newsletter-editor"
            url={image}
            setUrl={setImage}
            onDelete={onImageDelete}
            onUpload={onImageUpload}
          />
          {/* <p>Placeholder - to be replaced with image</p> */}
          <h2>Newsletter Content</h2>
          <pre className={styles.content}>{content}</pre>
          {/* Delete button */}

          <WarningModule
            titleText="Are you sure you want to delete this newsletter?"
            subtitleText="This action is permanent and cannot be undone."
            cancelText="No, cancel"
            actionText="Delete newsletter"
            cancel={confirmCancel}
            action={handleDelete}
          >
            <div className={styles.deleteButtonWrapper}>
              <button
                onClick={() => {
                  setIsDeleting(true);
                }}
                className={styles.deleteButton}
              >
                <p>Delete</p>
              </button>
            </div>
          </WarningModule>
          <div className={styles.grayOut}></div>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className={styles.sidebar}>
        <WarningModule
          titleText="You have unsaved changes!"
          subtitleText="Do you want to save the changes you made to this newsletter?"
          cancelText="Discard changes"
          actionText="Save changes"
          cancel={confirmCancel}
          action={() => {
            void handleSave();
          }}
        >
          <div className={styles.closeWindow}>
            <Image src="/ic_doublecaretright.svg" alt="test" width={24} height={24} />
            <p>Close Window</p>
          </div>
        </WarningModule>
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
              <SimpleImageDropzone
                folder="newsletter-editor"
                url={image}
                setUrl={setImage}
                onDelete={onImageDelete}
                onUpload={onImageUpload}
              />

              <TextArea
                label="Newsletter Content"
                id="textarea"
                className={`${styles.textArea} ${styles.stretch}`}
                value={content}
                onChange={(event) => {
                  console.log("onChange");
                  setContent(event.target.value);
                }}
                error={errors.content}
              />
            </div>
          </form>
        </div>
        <div className="w-full">
          <div className={styles.bottomButtons}>
            {/* Cancel button */}
            <WarningModule
              titleText="You have unsaved changes!"
              subtitleText="Do you want to save the changes you made to this newsletter?"
              cancelText="Discard changes"
              actionText="Save changes"
              cancel={confirmCancel}
              action={handleSave}
            >
              <div
                className={`${styles.cancelButton} flex py-[4px] px-[16px] justify-center items-center gap-[6px] rounded-md`}
              >
                <p className="text-[20px] font-bold leading-normal tracking-[0.7px]">Cancel</p>
              </div>
            </WarningModule>
            {/* Save button */}
            <button
              onClick={() => {
                void handleSave();
              }}
              className={styles.saveButton}
            >
              <p>Save</p>
            </button>
          </div>
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
          <SimpleImageDropzone
            folder="newsletter-editor"
            url={image}
            setUrl={setImage}
            onDelete={onImageDelete}
            onUpload={onImageUpload}
          />
          {/* <p>Placeholder - to be replaced with image</p> */}
          <h2>Newsletter Content</h2>
          <pre className={styles.content}>{content}</pre>
          {/* Delete button */}
          <WarningModule
            titleText="Are you sure you want to delete this newsletter?"
            subtitleText="This action is permanent and cannot be undone."
            cancelText="No, cancel"
            actionText="Delete newsletter"
            cancel={confirmCancel}
            action={handleDelete}
          >
            <div className={styles.deleteButtonWrapper}>
              <button
                onClick={() => {
                  setIsDeleting(true);
                }}
                className={styles.deleteButton}
              >
                <p>Delete</p>
              </button>
            </div>
          </WarningModule>
        </div>
      </div>
    );
  }
};

export default NewsletterSidebar;
