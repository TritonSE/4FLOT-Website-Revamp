/**
 * Parses .env parameters and ensures they are of required types and are not missing.
 * If any .env parameters are missing or of the wrong type, the an error will be thrown.
 */

import { cleanEnv } from "envalid";
import { json, str } from "envalid/dist/validators";

/**
 * NextJS only allows the frontend to access environment variables if they start with
 * "NEXT_PUBLIC", so we have to manually acccess attributes of process.env here.
 */
export default cleanEnv(
  {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_FIREBASE_SETTINGS: process.env.NEXT_PUBLIC_FIREBASE_SETTINGS,
  },
  {
    NEXT_PUBLIC_BACKEND_URL: str(), // URL of our backend
    NEXT_PUBLIC_FIREBASE_SETTINGS: json(), // Firebase settings for frontend, stored as a JSON string
  },
);
