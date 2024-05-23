"use client";

import { getAuth } from "firebase/auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import LoadingSpinner from "./LoadingSpinner";

const PrivatePage: FC<{ children: ReactNode }> = ({ children }) => {
  const auth = getAuth();

  const [user, loading, error] = useAuthState(auth);

  // still loading auth token
  if (loading) {
    return <LoadingSpinner />;
  }

  // firebase threw AuthError, non-critical
  if (error) {
    console.log(error);
    redirect("/admin");
    return <LoadingSpinner />;
  }

  // user is signed in
  if (user) {
    return children;
  }

  // otherwise go to login
  redirect("/admin");
  return <LoadingSpinner />;
};

export default PrivatePage;
