"use client";
import { Dispatch, SetStateAction, useState } from "react";

import { CreateDonationEmailRequest, sendEmail } from "@/api/email";

type PhysicalDonationFormProps = {
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

const PhysicalDonationForm = ({ setSuccess }: PhysicalDonationFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const donationEmailRequest: CreateDonationEmailRequest = {
      type: "donation",
      firstName,
      lastName,
      email,
      phone,
      comment,
    };
    sendEmail(donationEmailRequest)
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {
        setSuccess(false);
      });
  };

  return (
    <form className="PhysicalDonationForm" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-gray-900/10 pb-5">
          <h2 className="text-base text-black font-bold leading-7 tracking-wide pb-2">
            To send us physical donations, please read the following guidelines and fill out your
            information below:
          </h2>
          <p className="mt-1 text-black text-base leading-normal font-normal font-sans">
            Please list out what donations you would like to give in the “Leave a Comment” section
            below. A team member will be in touch with you within ## hours to further confirm
            drop-off instructions.
            <br />
            <br />
            4FLOT currently does not accept large donations such as furniture items.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 350,
                  lineHeight: "24px",
                  color: "#484848",
                }}
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#7b61a3] sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                ></input>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 350,
                  lineHeight: "24px",
                  color: "#484848",
                }}
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#7b61a3] sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  required
                ></input>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 350,
                  lineHeight: "24px",
                  color: "#484848",
                }}
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#7b61a3] sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                ></input>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 350,
                  lineHeight: "24px",
                  color: "#484848",
                }}
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#7b61a3] sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  required
                ></input>
              </div>
            </div>

            <div className="col-span-full">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 350,
                  lineHeight: "24px",
                  color: "#484848",
                }}
              >
                Leave a Comment:
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#7b61a3] sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  required
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-[#694C97] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#7b61a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61a3] w-full"
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "150%", // 30px
              letterSpacing: "0.8px",
            }}
          >
            Submit Donation
          </button>
        </div>
      </div>
    </form>
  );
};

export default PhysicalDonationForm;
