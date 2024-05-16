"use client";

import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { useSigninCheck } from "reactfire";

import LoadingSpinner from "./LoadingSpinner";

const PrivatePage: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return <LoadingSpinner />;
  } else if (!signInCheckResult.signedIn) {
    router.push("/admin");
    return <LoadingSpinner />;
  } else if (signInCheckResult.signedIn) {
    return children;
  } else {
    // status can be error
    return <LoadingSpinner />;
  }
};

export default PrivatePage;
