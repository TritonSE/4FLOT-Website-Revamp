"use client";

import Link from "next/link";

import styles from "./LoginForm.module.css";

type LoginFormProps = {
  //TODO: Pass firebase login function here to pass form data to
};

const handleSubmit = (e) => {
  console.log(`email:${email}\npassword:${password}`);
};

const LoginForm = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-5 text-left text-xl font-semibold leading-9 tracking-tight text-gray-500">
            4 Future Leaders of Tomorrow
          </h2>
          <h2 className="text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log Into Your Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#553884] sm:text-sm sm:leading-6"
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
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#553884] sm:text-sm sm:leading-6"
                />
              </div>

              {/* Uncomment this if we do the forgot password feature
              <div className="text-sm">
                <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div> */}
            </div>

            <div>
              <button
                type="submit"
                onSubmit={handleSubmit}
                className="flex w-full justify-center rounded-md bg-[#694C97] px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-[#553884] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#694C97]"
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
