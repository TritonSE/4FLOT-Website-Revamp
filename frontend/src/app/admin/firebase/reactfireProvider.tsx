"use client";

import { FirebaseOptions } from "firebase/app";
import { FirebaseStorage } from "firebase/storage";
import { FC, ReactNode } from "react";
import { FirebaseAppProvider, StorageProvider } from "reactfire";

type FirebaseProviderSDKsProps = {
  storage: FirebaseStorage;
  firebaseConfig: FirebaseOptions;
  children: ReactNode;
};

const FirebaseProviderSDKs: FC<FirebaseProviderSDKsProps> = ({
  storage,
  firebaseConfig,
  children,
}: FirebaseProviderSDKsProps) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <StorageProvider sdk={storage}>{children}</StorageProvider>
    </FirebaseAppProvider>
  );
};

export default FirebaseProviderSDKs;
