import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Auth, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";

import env from "../util/validateEnv";

export type FirebaseServices = { auth: Auth; storage: FirebaseStorage };

/**
 * Initialize Firebase with the Firebase config
 * @returns FirebaseServices array instance
 */
export const initFirebase = (): FirebaseServices => {
  if (!env.NEXT_PUBLIC_FIREBASE_SETTINGS) {
    throw new Error("Cannot get firebase settings. " + process.env.NEXT_PUBLIC_FIREBASE_SETTINGS);
  }

  const firebaseConfig = env.NEXT_PUBLIC_FIREBASE_SETTINGS as FirebaseOptions;

  const app: FirebaseApp = initializeApp(firebaseConfig);
  const auth: Auth = getAuth(app);
  const storage: FirebaseStorage = getStorage(app);

  return { auth, storage };
};

/**
 * Uses Firebase to login with email and password
 * @param auth Firebase Auth instance. In components get with useFirebase()
 * @param email email address
 * @param password password
 * @returns boolean true if sign in successful, false otherwise
 */
export const firebaseSignIn = async (auth: Auth, email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Sign out using Firebase and delete client data holding the JWT
 * @param auth Firebase Auth instance. In components get with useFirebase()
 */
export const firebaseSignOut = async (auth: Auth) => {
  try {
    await signOut(auth);
  } catch (error) {
    alert(error);
  }
};

/**
 * Get's the firebase config for use with reactfire components
 *
 */
export const getFirebaseConfig = (): FirebaseOptions => {
  if (!env.NEXT_PUBLIC_FIREBASE_SETTINGS) {
    throw new Error("Cannot get firebase settings");
  }
  return env.NEXT_PUBLIC_FIREBASE_SETTINGS as FirebaseOptions;
};
