"use client";
import React, { useState } from "react";

import { sendEmail } from "../api/email";

import styles from "./VolunteerForm.module.css";

import { getEventDetails } from "@/api/eventDetails";

type VolunteerFormProps = {
  eventId: string;
  setSuccess: (success: boolean) => void;
  children?: React.ReactNode;
  className?: string;
};

const VolunteerForm: React.FC<VolunteerFormProps> = ({
  eventId,
  setSuccess,
  children,
  className,
}: VolunteerFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [receiveNews, setReceiveNews] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const validateEmail = (_email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(_email);
  };

  const validatePhoneNumber = (_phoneNumber: string): boolean => {
    const re = /^\d{3}-\d{3}-\d{4}$/;
    return re.test(_phoneNumber);
  };

  const validateForm = () => {
    let allowSubmit = true;

    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPhoneNumberError("");

    if (!firstName) {
      setFirstNameError("Please enter your first name");
      allowSubmit = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Please enter your last name");
      allowSubmit = false;
    } else {
      setLastNameError("");
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address (xx@domain.com)");
      allowSubmit = false;
    } else {
      setEmailError("");
    }

    console.log(phoneNumber);
    validatePhoneNumber(phoneNumber);

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError("Please enter a valid phone number (XXX-XXX-XXXX)");
      allowSubmit = false;
    } else {
      setPhoneNumberError("");
    }
    console.log(allowSubmit);

    return allowSubmit;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allowSubmit = validateForm();

    if (allowSubmit) {
      getEventDetails(eventId)
        .then((response) => {
          if (response.success) {
            const eventName = response.data.name;
            sendEmail({
              type: "volunteer",
              eventName,
              firstName,
              lastName,
              email,
              phoneNumber,
              receiveNews,
            }).then(
              () => {
                console.log("Email sent!");
              },
              (error) => {
                alert(error);
              },
            );
          } else {
            alert(response.error);
          }
        })
        .catch((error) => {
          alert(error);
        });

      setSuccess(true);
    }
  };

  return (
    <div className={`${styles.volunteerForm} ${className}`}>
      <p className={styles.heading}>Volunteer With Us!</p>
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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {emailError && <div className={styles.errorMessage}>{emailError}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber" className={styles.fieldName}>
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className={styles.inputField}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          {phoneNumberError && <div className={styles.errorMessage}>{phoneNumberError}</div>}
        </div>
        <div className={styles.formGroup}>
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            onChange={(e) => {
              setReceiveNews(e.target.checked);
            }}
          />
          <label htmlFor="updates" className={styles.updates}>
            Receive news and updates for volunteers
          </label>
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

export default VolunteerForm;
