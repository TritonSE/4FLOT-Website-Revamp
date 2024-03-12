/*
 * Controller for the email route, /api/email.
 */
import { sendContactEmail } from "../../../backend/src/services/emails";

import { RequestHandler } from "express";

export const createEmail: RequestHandler = async (req, res, next) => {
  const { name, email, phone, subject, message, question } = req.body;

  //Extract question type from the selected option if it is "I have a _ question"
  let questionType = "";
  if (question === "Other") {
    questionType = "Other message";
  } else {
    questionType = question.split(" ").slice(3).join(" ");
    questionType = questionType[0].toUpperCase() + questionType.slice(1);
  }

  const EMAIL_SUBJECT = `${questionType} from ${name}`;
  const EMAIL_BODY = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\n${message}`;

  try {
    const sentEmail = await sendContactEmail(EMAIL_SUBJECT, EMAIL_BODY);

    // Successfully sent email
    res.status(200).json(sentEmail);
  } catch (error) {
    next(error);
  }
};
