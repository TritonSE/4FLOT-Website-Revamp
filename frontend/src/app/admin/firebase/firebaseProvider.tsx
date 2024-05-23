"use client";

import { Auth } from "firebase/auth";
import { FirebaseStorage } from "firebase/storage";
import React, { FC, ReactNode, createContext, useContext } from "react";

import { FirebaseServices, initFirebase } from "./firebase";

const AuthContext = createContext<Auth | undefined>(undefined);
const StorageContext = createContext<FirebaseStorage | undefined>(undefined);

let firebaseServices: FirebaseServices | undefined;

export const FirebaseProvider: FC<{ children: ReactNode }> = ({ children }) => {
  if (firebaseServices === undefined) {
    firebaseServices = initFirebase();
  }

  return (
    <AuthContext.Provider value={firebaseServices.auth}>
      <StorageContext.Provider value={firebaseServices.storage}>{children}</StorageContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useStorage = () => useContext(StorageContext);
