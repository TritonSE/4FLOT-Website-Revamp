import React from "react";

import styles from "./ContactForm.module.css";

const ContactForm: React.FC = () => {
  return (
    <form className={styles.form}>
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
          <input className={styles.inputShort} type="text" id="lastName" name="lastName" required />
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
        <input className={styles.inputLong} type="text" id="subject" name="subject" required />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <br></br>
        <textarea className={styles.inputLong} id="message" name="message" required />
      </div>
      <button type="submit">Contact Us</button>
    </form>
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
