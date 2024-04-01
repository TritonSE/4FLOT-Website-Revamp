"use client";
import React, { useState } from "react";

import { createSubscriber } from "../api/subscriber";

import styles from "./NewsletterForm.module.css";

type NewsLetterFormProps = {
  setSuccess: (success: boolean) => void;
  children?: React.ReactNode;
  className?: string;
};

const NewsletterForm: React.FC<NewsLetterFormProps> = ({
  setSuccess,
  children,
  className,
}: NewsLetterFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [quarterlyUpdates, setQuarterlyUpdates] = useState(false);
  const [specialUpdates, setSpecialUpdates] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [updatesError, setUpdatesError] = useState("");

  const validateEmail = (_email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(_email);
  };

  const validateForm = () => {
    let success = true;

    if (!firstName) {
      setFirstNameError("Please enter your first name");
      success = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Please enter your last name");
      success = false;
    } else {
      setLastNameError("");
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address (xx@domain.com)");
      success = false;
    } else {
      setEmailError("");
    }

    if (!quarterlyUpdates && !specialUpdates) {
      setUpdatesError("Please select at least one update type");
      success = false;
    } else {
      setUpdatesError("");
    }

    return success;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = validateForm();

    if (success) {
      createSubscriber({ firstName, lastName, email, quarterlyUpdates, specialUpdates }).then(
        (result) => {
          if (result.success) {
            setSuccess(true);
          } else {
            setSuccess(false);
            if (result.error.includes("email is already subscribed")) {
              setEmailError("This email is already subscribed!");
            } else {
              setUpdatesError("Error with your request, please try again later");
            }
          }
        },
        (error) => {
          // If the .then() request fails, show the error message
          alert(error);
        },
      );
    }
  };

  return (
    <div className={`${styles.NewsletterForm} ${className}`}>
      <p className={styles.heading}>Join Our Newsletter!</p>
      <p className={styles.description}>
        Subscribe for quarterly updates about what our team is doing, big events, and our future
        plans!
      </p>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.fieldName}>
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={styles.inputField}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          {firstNameError && <div className={styles.errorMessage}>{firstNameError}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.fieldName}>
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={styles.inputField}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          {lastNameError && <div className={styles.errorMessage}>{lastNameError}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.fieldName}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.inputField}
            value={email}
            onInvalid={(e) => {
              e.preventDefault();
              validateForm();
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {emailError && <div className={styles.errorMessage}>{emailError}</div>}
        </div>
        <div className={styles.formGroup}>
          <input
            type="checkbox"
            id="quarterlyUpdates"
            name="quarterlyUpdates"
            onChange={(e) => {
              setQuarterlyUpdates(e.target.checked);
            }}
          />
          <label htmlFor="quarterlyUpdates" className={styles.updates}>
            Receive updates for our quarterly newsletters
          </label>
        </div>
        <div className={styles.formGroup}>
          <input
            type="checkbox"
            id="specialUpdates"
            name="specialUpdates"
            onChange={(e) => {
              setSpecialUpdates(e.target.checked);
            }}
          />
          <label htmlFor="specialUpdates" className={styles.updates}>
            Receive newsletters about our special events
          </label>
          {updatesError && <div className={styles.errorMessage}>{updatesError}</div>}
        </div>
        <div className={styles.center}>
          <button type="submit" className={styles.signupButton}>
            Sign Up
          </button>
        </div>
      </form>
      {children}
    </div>
  );
};

export default NewsletterForm;
