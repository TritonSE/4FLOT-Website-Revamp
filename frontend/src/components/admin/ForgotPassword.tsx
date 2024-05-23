"use client";

import { sendPasswordResetEmail } from "firebase/auth";
import React, { Dispatch, SetStateAction, useState } from "react";

import { useAuth } from "@/app/admin/firebase/firebaseProvider";

type ForgotPasswordProps = {
  setForgotPass: Dispatch<SetStateAction<boolean>>;
};

const ForgotPassword = ({ setForgotPass }: ForgotPasswordProps) => {
  const [email, setEmail] = useState<string>("");
  const [state, setState] = useState("unclicked");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const auth = useAuth();

  const isValidEmail = (_email: string) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(_email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMsg("Invalid email address");
      return;
    }

    setErrorMsg("");
    if (auth) {
      setState("loading");
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Successfully sent email
          setState("clicked");
        })
        .catch((error) => {
          setState("unclicked");
          alert(error);
        });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <button
            className="bg-white text-[#694C97]"
            onClick={() => {
              setForgotPass(false);
            }}
          >
            ← Back to Login
          </button>
          <h2
            style={{ font: "var(--font-title-l)" }}
            className="text-left text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Forgot Password?
          </h2>
          <p>
            For instructions to reset your password, enter the email address associated with your
            account.
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#553884] sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg("");
                  }}
                />
                {errorMsg && <p className="m-1 text-sm text-red-500">{errorMsg}</p>}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={
                  "flex w-full justify-center rounded-md bg-[#694C97] px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-[#553884] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#694C97]" +
                  (state === "clicked"
                    ? " bg-green-600 hover:bg-green-600 outline-green-400 focus-visible:outline-green-400"
                    : "") +
                  (state === "loading" ? " bg-bg-[#553884]" : "")
                }
                onClick={handleSubmit}
                disabled={state === "clicked" || state === "loading"}
              >
                {state === "unclicked" && <p>Send Email</p>}
                {state === "loading" && <p>Sending Email...</p>}
                {state === "clicked" && <p>Email Sent!</p>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
