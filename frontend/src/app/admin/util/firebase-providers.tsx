"use client";

import { FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FC, ReactNode, useMemo } from "react";
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  StorageProvider,
  useFirebaseApp,
} from "reactfire";

export const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyC0JaYSDXMzWivnh08itviRohomG6R_MHo",
    authDomain: "flot-dev.firebaseapp.com",
    projectId: "flot-dev",
    storageBucket: "flot-dev.appspot.com",
    messagingSenderId: "738782826196",
    appId: "1:738782826196:web:e020d0f0bd0d98aeb8f541"
  };

const FirebaseProviderSDKs: FC<{ children: ReactNode }> = ({ children }) => {
  const firebase = useFirebaseApp();
  // we have to use getters to pass to providers, children should use hooks
  const auth = useMemo(() => getAuth(), []);
  const firestore = useMemo(() => getFirestore(firebase), []);
  const storage = useMemo(() => getStorage(firebase), []);

  return (
    <>
      {auth && (
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestore}>
            <StorageProvider sdk={storage}>
              {children}
            </StorageProvider>
          </FirestoreProvider>
        </AuthProvider>
      )}
    </>
  );
};

export const MyFirebaseProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirebaseProviderSDKs>{children}</FirebaseProviderSDKs>
      </FirebaseAppProvider>
    </>
  );
};
