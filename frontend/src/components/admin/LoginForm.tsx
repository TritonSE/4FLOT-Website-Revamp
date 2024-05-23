"use client";

import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

import styles from "./LoginForm.module.css";

import { firebaseSignIn } from "@/app/admin/firebase/firebase";
import { useAuth } from "@/app/admin/firebase/firebaseProvider";

type LoginFormProps = {
  setForgotPass: Dispatch<SetStateAction<boolean>>;
};

const LoginForm = ({ setForgotPass }: LoginFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [valid, setValid] = useState(true);

  const router = useRouter();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let signInSuccessful = false;
    try {
      if (auth) {
        signInSuccessful = await firebaseSignIn(auth, email, password);
      } else {
        throw new Error("Firebase Auth not initialized.");
      }
    } catch (error) {
      // firebaseSignIn should not throw an error because
      // it has error handling inside the funciton
      // something has gone very wrong
      alert(error);
    }

    if (signInSuccessful) {
      setValid(true);
      router.push("/admin/dashboard");
    } else {
      setValid(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className={styles.title}>4 Future Leaders of Tomorrow</h2>
          <h2 className={styles.subtitle}>Log Into Your Account</h2>
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
                  placeholder="Enter email"
                  autoComplete="email"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#553884] sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#553884] sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit(e).catch((error) => {
                        console.log(error);
                      });
                    }
                  }}
                />
              </div>
              {!valid && <p className="m-1 text-sm text-red-500">Invalid email or password.</p>}
              <div className="text-sm">
                <button
                  onClick={() => {
                    setForgotPass(true);
                  }}
                  className="m-1 font-semibold text-[#694C97] hover:text-[#553884]"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <div>
              <button
                id="submit"
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#694C97] px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-[#553884] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#694C97]"
                onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handleSubmit(e).catch((error) => {
                    console.log(error);
                  });
                }}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
