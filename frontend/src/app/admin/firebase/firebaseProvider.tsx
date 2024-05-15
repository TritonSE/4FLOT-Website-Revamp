"use client";

import { Auth } from "firebase/auth";
import React, { createContext, useContext, useMemo } from "react";

import { getFirebaseConfig, initFirebase } from "./firebase";
import FirebaseProviderSDKs from "./reactfireProvider";

const FirebaseContext = createContext<Auth | null>(null);

/**
 * Firebase Context Provider giving access to Auth object in components
 */
export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth, storage } = useMemo(() => initFirebase(), []);

  return (
    <FirebaseContext.Provider value={auth}>
      <FirebaseProviderSDKs storage={storage} firebaseConfig={getFirebaseConfig()}>
        {children}
      </FirebaseProviderSDKs>
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
