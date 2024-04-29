import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import env from "@/app/admin/util/validateEnv";

export const initFirebase = () => {
  if (!env.NEXT_PUBLIC_FIREBASE_SETTINGS) {
    throw new Error("Cannot get firebase settings");
  }

  const firebaseConfig = env.NEXT_PUBLIC_FIREBASE_SETTINGS as FirebaseOptions;

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return { app, auth };
};
