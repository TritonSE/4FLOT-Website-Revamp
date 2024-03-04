import Image from "next/image";
import React, { useState } from "react";

import NewsletterForm from "./newsletter-form";

type newsletterPopupProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function NewsletterPopup({ open, setOpen }: newsletterPopupProps) {
  const [hover, setHover] = useState(false);
  const [success, setSuccess] = useState(false);

  // submitForm only runs when there is a successful submission
  // ie. all fields are filled out and valid
  // declared as arrow function to have access to setSuccess
  const submitForm = (
    firstName: string,
    lastName: string,
    email: string,
    quarterlyUpdates: boolean,
    specialUpdates: boolean,
  ) => {
    // DEBUG: Remove later and replace with POST request
    console.log("Submitting form");
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(quarterlyUpdates);
    console.log(specialUpdates);
  };
  if (!success) {
    // ----- FORM POPUP -----
    return (
      <div
        className={
          `fixed h-screen w-screen top-0 left-0 z-50 bg-black bg-opacity-20 flex justify-center items-center` +
          (open ? "" : "invisible hidden")
        }
      >
        <NewsletterForm setSuccess={setSuccess} submitForm={submitForm}>
          <button
            className="absolute scale-100 top-6 right-6 hover:scale-110 transition-all duration-100 ease-linear"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <svg
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M2 2L22.2028 22.2028"
                stroke={hover ? "#e26363" : "#C6C6C6"}
                strokeWidth="2.65777"
                strokeLinecap="round"
              />
              <path
                d="M2 22.2031L22.2028 2.00033"
                stroke={hover ? "#e26363" : "#C6C6C6"}
                strokeWidth="2.65777"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </NewsletterForm>
      </div>
    );
  } else {
    // ----- SUCCESS POPUP -----
    return (
      <div
        className={
          `fixed h-screen w-screen top-0 left-0 z-50 bg-black bg-opacity-20 flex justify-center items-center` +
          (open ? "" : "invisible hidden")
        }
      >
        <div className="flex flex-col justify-center w-[872px] h-min relative rounded-[10px] p-10 bg-white">
          <Image
            src="/volunteerSuccess.png"
            className="self-center"
            alt="Success Artwork"
            width={493}
            height={461}
          />
          <p className="text-center py-2" style={{ font: "var(--font-title-l)" }}>
            Thanks For Signing Up!
          </p>
          <p className="text-center" style={{ font: "var(--font-body-reg)" }}>
            You’re now subscribed to our newsletter! You’ll hear from us shortly. If you have any
            questions, please contact [insert 4FLOT email address here].
          </p>
          <button
            className="absolute scale-100 top-6 right-6 hover:scale-110 transition-all duration-100 ease-linear"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <svg
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M2 2L22.2028 22.2028"
                stroke={hover ? "#e26363" : "#C6C6C6"}
                strokeWidth="2.65777"
                strokeLinecap="round"
              />
              <path
                d="M2 22.2031L22.2028 2.00033"
                stroke={hover ? "#e26363" : "#C6C6C6"}
                strokeWidth="2.65777"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}
