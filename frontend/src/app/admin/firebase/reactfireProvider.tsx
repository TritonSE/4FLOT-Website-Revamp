"use client";

import { FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { FC, ReactNode, useMemo } from "react";
import { AuthProvider, FirebaseAppProvider, StorageProvider, useFirebaseApp } from "reactfire";

import { getFirebaseConfig } from "./firebase";

const FirebaseSDKProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const app: FirebaseApp = useFirebaseApp();
  const auth: Auth = useMemo(() => getAuth(app), []);
  const storage: FirebaseStorage = useMemo(() => getStorage(app), []);

  return (
    <AuthProvider sdk={auth}>
      <StorageProvider sdk={storage}>{children}</StorageProvider>
    </AuthProvider>
  );
};

const ReactFireProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const firebaseConfig = getFirebaseConfig();

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseSDKProvider>{children}</FirebaseSDKProvider>
    </FirebaseAppProvider>
  );
};

export default ReactFireProvider;
