import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  Auth,
  User,
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import env from "@/app/admin/util/validateEnv";

export const initFirebase = () => {
  if (!env.NEXT_PUBLIC_FIREBASE_SETTINGS) {
    throw new Error("Cannot get firebase settings");
  }

  const firebaseConfig = env.NEXT_PUBLIC_FIREBASE_SETTINGS as FirebaseOptions;

  const app: FirebaseApp = initializeApp(firebaseConfig);
  const auth: Auth = getAuth(app);

  return auth;
};

export const firebaseSignIn = async (auth: Auth, email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  } catch (error) {
    alert(error);
  }
};

export const firebaseSignOut = async (auth: Auth) => {
  signOut(auth)
    .then(() => {
      console.log("signed out!");
    })
    .catch((error) => {
      alert(error);
    });
};
