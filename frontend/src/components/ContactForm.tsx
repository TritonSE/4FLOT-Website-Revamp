"use client";
import Image from "next/image";
import React from "react";

import { sendEmail } from "../api/email";

import Button from "./Button";
import styles from "./ContactForm.module.css";

const ContactForm: React.FC = () => {
  /**
   * Display dropdown menu on click, update arrow, change text color.
   */
  function showDiv() {
    const dropdown = document.getElementById("selectDropdown");
    const arrowUp = document.getElementById("customArrowUp");
    const arrowDown = document.getElementById("customArrowDown");
    const dropdownText = document.getElementById("selectedOption");
    if (dropdown?.style.display === "block") {
      dropdown.style.display = "none";
      arrowUp.style.display = "none";
      arrowDown.style.display = "block";
      dropdownText.style.color = "black"; // Change text color to black
    } else {
      dropdown.style.display = "block";
      arrowUp.style.display = "block";
      arrowDown.style.display = "none";
      dropdownText.style.color = "#ccc"; // Change text color to gray
    }
  }

  /**
   * Update dropdown option selected on click
   * @param optionValue Index of option selected
   */
  function updateSelect(optionValue: number) {
    document.getElementById("selectedOption").innerText = document.getElementById(
      "Option " + optionValue,
    )?.innerText;
  }

  let name = "";
  let email = "";
  let phone = "";
  let subject = "";
  let message = "";
  let questionType = "";

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // We do not want the page to refresh
    name =
      document.getElementById("firstName").value + " " + document.getElementById("lastName").value;
    email = document.getElementById("email").value;
    message = document.getElementById("message").value;
    phone = document.getElementById("phone").value;
    subject = document.getElementById("subject").value;
    questionType = document.getElementById("selectedOption").innerText;
    document.getElementById("contactForm").reset(); //Reset form
    sendEmail({ name, email, phone, subject, message, question: questionType }).then(
      () => {
        console.log("Email sent!");
      },
      (error) => {
        // If the .then() request fails, show the error message
        alert(error);
      },
    );
  };

  return (
    <div>
      <form className={styles.form} id="contactForm" onSubmit={handleFormSubmit}>
        <div className={styles.lineWrapper}>
          <label htmlFor="firstName">
            First Name
            <br></br>
            <input
              className={styles.inputShort}
              type="text"
              id="firstName"
              name="firstName"
              required
            />
          </label>

          <label htmlFor="lastName">
            Last Name
            <br></br>
            <input
              className={styles.inputShort}
              type="text"
              id="lastName"
              name="lastName"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br></br>
          <input className={styles.inputLong} type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <br></br>
          <input className={styles.inputLong} type="tel" id="phone" name="phone" />
        </div>
        <div>
          <p>How can we help you?</p>
          <br></br>
          <div className={styles.customSelect}>
            <div className={styles.select} id="helpOption" onClick={showDiv}>
              <p id="selectedOption">I have a donation question</p>
              <ul className={styles.selectDropdown} id="selectDropdown">
                <li
                  id="Option 1"
                  onClick={() => {
                    updateSelect(1);
                  }}
                >
                  I have a donation question
                </li>
                <li
                  id="Option 2"
                  onClick={() => {
                    updateSelect(2);
                  }}
                >
                  I have a volunteer question
                </li>
                <li
                  id="Option 3"
                  onClick={() => {
                    updateSelect(3);
                  }}
                >
                  I have a sponsor question
                </li>
                <li
                  id="Option 4"
                  onClick={() => {
                    updateSelect(4);
                  }}
                >
                  I have a general question
                </li>
                <li
                  id="Option 5"
                  onClick={() => {
                    updateSelect(5);
                  }}
                >
                  Other
                </li>
              </ul>
            </div>
            <Image
              id="customArrowUp"
              width={11.97}
              height={7.65}
              src="upArrow.svg"
              alt=""
              className={styles.customArrow}
              style={{ display: "none" }}
            ></Image>
            <Image
              id="customArrowDown"
              width={11.97}
              height={7.65}
              src="downArrow.svg"
              alt=""
              className={styles.customArrow}
            ></Image>
          </div>
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <br></br>
          <input className={styles.inputLong} type="text" id="subject" name="subject" required />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <br></br>
          <textarea className={styles.inputMessage} id="message" name="message" required />
        </div>
        <br></br>
        {/* Button with type submit */}
        <Button text="Contact Us" link=""></Button>
      </form>
    </div>
  );
};

export default ContactForm;
