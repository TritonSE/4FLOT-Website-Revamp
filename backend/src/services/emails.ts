import "dotenv/config";
import nodemailer from "nodemailer";

import env from "../util/validateEnv";
/**
 * Sends a notification email to 4FLOT staff when a contact email is submitted.
 * Throws an error if the email could not be sent.
 */
const sendContactEmail = async (subject: string, message: string) => {
  const EMAIL_SUBJECT = `${subject}`;
  const EMAIL_BODY = `${message}`;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_APP_PASSWORD,
    },
  });
  const mailOptions = {
    from: env.EMAIL_USER,
    to: env.EMAIL_NOTIFICATIONS_RECIPIENT,
    subject: EMAIL_SUBJECT,
    text: EMAIL_BODY,
  };
  await transporter.sendMail(mailOptions);
};
export { sendContactEmail };
