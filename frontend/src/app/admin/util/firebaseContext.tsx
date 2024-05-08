"use client";

import { Auth } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import { initFirebase } from "./firebase";

type FirebaseContextType = {
  auth: Auth | null;
  user: string | null;
};

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setAuth(initFirebase());
  }, []);

  return <FirebaseContext.Provider value={{ auth, user }}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => useContext(FirebaseContext);
