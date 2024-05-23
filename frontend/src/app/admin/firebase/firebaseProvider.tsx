"use client";

import { Auth } from "firebase/auth";
import { FirebaseStorage } from "firebase/storage";
import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";

import { FirebaseServices, initFirebase } from "./firebase";

const AuthContext = createContext<Auth | undefined>(undefined);
const StorageContext = createContext<FirebaseStorage | undefined>(undefined);

export const FirebaseProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [firebaseServices, setFirebaseServices] = useState<FirebaseServices | undefined>(undefined);

  useEffect(() => {
    // Don't initialize Firebase if it has already been initialized
    if (firebaseServices === undefined) {
      setFirebaseServices(initFirebase());
    }
  }, []);

  return (
    <AuthContext.Provider value={firebaseServices?.auth}>
      <StorageContext.Provider value={firebaseServices?.storage}>
        {children}
      </StorageContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useStorage = () => useContext(StorageContext);
