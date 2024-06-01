"use strict";
/**
 * Parses .env parameters and ensures they are of required types. If any .env parameters are
 * missing, the server will not start and an error will be thrown.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validators_1 = require("envalid/dist/validators");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, validators_1.port)(), // Port to run backend on
    MONGODB_URI: (0, validators_1.str)(), // URI of MongoDB database to use
    FRONTEND_ORIGIN: (0, validators_1.str)(), // URL of frontend, to allow CORS from frontend
    EMAIL_USER: (0, validators_1.email)(), // Email address to use for sending emails
    EMAIL_APP_PASSWORD: (0, validators_1.str)(), // App password to use for sending emails
    EMAIL_NOTIFICATIONS_RECIPIENT: (0, validators_1.email)(), // Recipient of VSR notification emails
    BACKEND_FIREBASE_SETTINGS: (0, validators_1.json)(), // Firebase settings for backend, stored as a JSON string
    SERVICE_ACCOUNT_KEY: (0, validators_1.json)(), // Private service account key for backend, stored as a JSON string
    PAYPAL_CLIENT_ID: (0, validators_1.str)(), // Client ID credential for PayPal account
    PAYPAL_CLIENT_SECRET: (0, validators_1.str)(), // Client secret credential for PayPal account
});
