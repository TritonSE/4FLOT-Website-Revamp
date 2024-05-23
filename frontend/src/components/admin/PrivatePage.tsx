"use client";

import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import LoadingSpinner from "./LoadingSpinner";

const PrivatePage: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const auth = getAuth();

  const [user, loading, error] = useAuthState(auth);

  // still loading auth token
  if (loading) {
    return <LoadingSpinner />;
  }

  // firebase threw AuthError, non-critical
  if (error) {
    console.log(error);
    router.push("/admin");
    return <LoadingSpinner />;
  }

  // user is signed in
  if (user) {
    return children;
  }

  // otherwise go to login
  router.push("/admin");
  return <LoadingSpinner />;
};

export default PrivatePage;
