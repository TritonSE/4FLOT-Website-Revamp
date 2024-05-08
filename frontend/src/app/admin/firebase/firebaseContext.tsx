"use client";

import { Auth } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import { initFirebase } from "./firebase";

const FirebaseContext = createContext<Auth | null>(null);

/**
 * Firebase Context Provider giving access to Auth object in components
 */
export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    // Don't initialize Firebase if it has already been initialized
    if (!auth) {
      setAuth(initFirebase());
    }
  }, []);

  return <FirebaseContext.Provider value={auth}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => useContext(FirebaseContext);
