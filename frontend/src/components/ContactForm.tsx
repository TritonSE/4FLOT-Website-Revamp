import React from "react";

// import styles from "./ContactForm.module.css";

const ContactForm: React.FC = () => {
  return (
    <form>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" required />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" />
      </div>
      <div>
        <label htmlFor="helpOption">How can we help you?</label>
        <select id="helpOption" name="helpOption" required>
          <option value="">-- Please Select --</option>
          <option value="Option 1">I have a donation question</option>
          <option value="Option 2">I have a volunteer question</option>
          <option value="Option 3">I have a sponsor question</option>
          <option value="Option 3">I have a general question</option>
        </select>
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" name="subject" required />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required />
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
