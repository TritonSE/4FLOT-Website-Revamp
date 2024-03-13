/**
 * Parses .env parameters and ensures they are of required types. If any .env parameters are
 * missing, the server will not start and an error will be thrown.
 */

import { cleanEnv } from "envalid";
import { email, port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  PORT: port(),
  MONGODB_URI: str(),
  EMAIL_USER: email(), // Email address to use for sending emails
  EMAIL_APP_PASSWORD: str(), // App password to use for sending emails
  EMAIL_NOTIFICATIONS_RECIPIENT: email(), // Recipient of VSR notification emails
});
