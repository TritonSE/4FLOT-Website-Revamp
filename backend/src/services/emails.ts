import "dotenv/config";
import nodemailer from "nodemailer";

import env from "../util/validateEnv";
/**
 * Sends a notification email to 4FLOT staff when a contact email is submitted.
 * Throws an error if the email could not be sent.
 *
 * @param name Name of person who submitted the contact email
 * @param email Email address of person who submitted the contact email
 */
const sendContactEmail = async (
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  question: string,
) => {
  const questionType = question.split(" ").splice(0, 3).join(" ").toUpperCase();
  const EMAIL_SUBJECT = `${subject}: ${questionType} from ${name}`;
  const EMAIL_BODY = `${message}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
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
