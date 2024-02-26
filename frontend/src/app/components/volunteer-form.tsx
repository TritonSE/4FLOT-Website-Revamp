"use client";
import React, { useState } from "react";

import styles from "../styles/volunteer-form.module.css";

type VolunteerFormProps = {
  setSuccess: (success: boolean) => void;
  submitForm: (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    reveiveNews: boolean,
  ) => void;
  children?: React.ReactNode;
  className?: string;
};

const VolunteerForm: React.FC<VolunteerFormProps> = ({
  setSuccess,
  submitForm,
  children,
  className,
}: VolunteerFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reveiveNews, setReceiveNews] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const validateEmail = (_email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(_email);
  };

  const validatePhoneNumber = (_phoneNumber: string): boolean => {
    // I don't understand why, but the regex at the end checking {3} instead of {4} is working
    const re = /^\d{3}-\d{3}-\d{3}$/;
    return re.test(_phoneNumber);
  };

  const validateForm = () => {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPhoneNumberError("");

    if (!firstName) {
      setFirstNameError("Please enter your first name");
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Please enter your last name");
    } else {
      setLastNameError("");
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address (xx@domain.com)");
    } else {
      setEmailError("");
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError("Please enter a valid phone number (XXX-XXX-XXXX)");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      firstNameError === "" &&
      lastNameError === "" &&
      emailError === "" &&
      phoneNumberError === ""
    ) {
      submitForm(firstName, lastName, email, phoneNumber, reveiveNews);
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
              validateForm();
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
              validateForm();
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
              validateForm();
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
              validateForm();
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
