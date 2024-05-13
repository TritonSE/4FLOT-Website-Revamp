"use client";

import Image from "next/image";
import { useState } from "react";

import ForgotPassword from "./ForgotPassword";
import LoginForm from "./LoginForm";

const LoginSection = () => {
  // false shows regular login, true shows forgot password
  const [forgotPass, setForgotPass] = useState(false);

  return (
    <div className="flex flex-row">
      <div className="bg-[#694C97] w-1/2 h-screen">
        <div className="m-0 p-0 flex justify-center items-center h-screen">
          <Image
            src="/admin/loginLogo.svg"
            alt="For Future Leaders of Tomorrow Logo"
            width={415}
            height={147}
          />
        </div>
      </div>
      <div className=" bg-white w-1/2 h-screen">
        <div className="m-0 p-0 flex justify-center items-center h-screen">
          {forgotPass ? (
            <ForgotPassword setForgotPass={setForgotPass} />
          ) : (
            <LoginForm setForgotPass={setForgotPass} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
