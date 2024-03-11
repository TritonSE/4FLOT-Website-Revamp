"use client";
import React from "react";

import { sendEmail } from "../api/email";

import Button from "./Button";
import styles from "./ContactForm.module.css";

const ContactForm: React.FC = () => {
  // const [email, setEmail] = useState<string>("");
  // const [name, setName] = useState<string>("");
  // const [submitted, setSubmitted] = useState<boolean>(false);
  // const [isLoading, setLoading] = useState<boolean>(false);
  // const [errors, setErrors] = useState<string | null>(null); // handleAPIError in /api/requests.ts will return a string
  // const [placeholder, setPlaceholder] = useState<string>("Enter your email address");
  let name = "";
  let email = "";
  let phone = "";
  let subject = "";
  let message = "";
  let question = "";

  const handleElementChange = () => {
    name =
      document.getElementById("firstName").value + " " + document.getElementById("lastName").value;
    email = document.getElementById("email").value;
    message = document.getElementById("message").value;
    phone = document.getElementById("phone").value;
    subject = document.getElementById("subject").value;
    question = document.getElementById("helpOption").value;
    // setEmail(event.target.value);
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // setErrors(null); // clear errors on new submission
    // setLoading(true); // disable the submit button while loading
    event.preventDefault(); // We do not want the page to refresh
    sendEmail({ name, email, phone, subject, message, question }).then(
      () => {
        // (result) => {
        // if (result.success) {
        // setSubmitted(true); // show the success message
        // setPlaceholder("Thanks for subscribing!");
        // setEmail(""); // clear the email input
        // } else {
        //   // This is certainly not the best solution to this issue, but it works okay for now.
        // setEmail(""); // clear email input to show error message
        // if (result.error === `400 Bad Request: {"error":"email must be a valid email address"}`) {
        //   setErrors(result.error);
        //   setPlaceholder("Please enter a valid email address (xxx@domain.com)");
        // } else if (result.error === `400 Bad Request: {"error":"email is already subscribed"}`) {
        //   setErrors("Already subscribed!");
        //   setPlaceholder("This email is already subscribed!");
        // } else {
        //   setErrors(result.error); // show unfilterd error message
        //   setPlaceholder("Error with your request, please try again later");
        // }
        // }
      },
      (error) => {
        // If the .then() request fails, show the error message
        alert(error);
      },
    );
    // setLoading(false); // re-enable the submit button
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleNewsletterSubmit}>
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
              onChange={handleElementChange}
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
              onChange={handleElementChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br></br>
          <input
            className={styles.inputLong}
            type="email"
            id="email"
            name="email"
            required
            onChange={handleElementChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <br></br>
          <input
            className={styles.inputLong}
            type="tel"
            id="phone"
            name="phone"
            onChange={handleElementChange}
          />
        </div>
        <div>
          <label htmlFor="helpOption">How can we help you?</label>
          <br></br>
          <select className={styles.select} id="helpOption" name="helpOption" required>
            <option value="Option 1" selected>
              I have a donation question
            </option>
            <option value="Option 2">I have a volunteer question</option>
            <option value="Option 3">I have a sponsor question</option>
            <option value="Option 3">I have a general question</option>
          </select>
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <br></br>
          <input
            className={styles.inputLong}
            type="text"
            id="subject"
            name="subject"
            required
            onChange={handleElementChange}
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <br></br>
          <textarea
            className={styles.inputMessage}
            id="message"
            name="message"
            required
            onChange={handleElementChange}
          />
        </div>
        <br></br>
        {/* Button with type submit */}
        <Button text="Contact Us" link=""></Button>
      </form>
      {/* <script>
      async function sendEmail() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        try {
          await fetch("/send-email", {//idk if this is supposed to be send-email
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
          });
          alert("Email sent successfully!");
        } catch (error) {
          console.error("Error sending email:", error);
          alert("Failed to send email.");
        }
      }
      </script> */}
    </div>
  );
};

export default ContactForm;

// import React, { useState } from "react";

// // interface FormValues {
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   phone: string;
// //   helpOption: string;
// //   subject: string;
// //   message: string;
// // }

// export const useForm = (callback: any, initialState = {}) => {
//   const [values, setValues] = useState(initialState);

//   // onChange
//   const onChange = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
//   ) => {
//     setValues({ ...values, [event.target.name]: event.target.value });
//   };

//   // onSubmit
//   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     await callback(); // triggering the callback
//   };

//   return {
//     onChange,
//     onSubmit,
//     values,
//   };
// };
