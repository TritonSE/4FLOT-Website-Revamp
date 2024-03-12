import "dotenv/config";
import nodemailer from "nodemailer";

import env from "../util/validateEnv";
/**
 * Sends a notification email to 4FLOT staff when a contact email is submitted.
 * Throws an error if the email could not be sent.
 */
const sendContactEmail = async (
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  question: string,
) => {
  //Extract question type from the selected option
  let questionType = question.split(" ").slice(3).join(" ");
  questionType = questionType[0].toUpperCase() + questionType.slice(1);

  const EMAIL_SUBJECT = `${questionType} from ${name}`;
  const EMAIL_BODY = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\n${message}`;
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
