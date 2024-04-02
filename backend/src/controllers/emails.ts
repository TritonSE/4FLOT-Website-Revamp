/*
 * Controller for the email route, /api/email.
 */
import { sendContactEmail } from "../../../backend/src/services/emails";

import { RequestHandler } from "express";

export const createEmail: RequestHandler = async (req, res, next) => {
  var EMAIL_SUBJECT = "";
  var EMAIL_BODY = "";

  if (req.body.type === "contact") {
    const { type, name, email, phone, subject, message, question } = req.body;

    // Extract question type from the selected option if it is "I have a _ question"
    let questionType = "";
    if (question === "Other") {
      questionType = "Other message";
    } else {
      questionType = question.split(" ").slice(3).join(" ");
      questionType = questionType[0].toUpperCase() + questionType.slice(1);
    }

    EMAIL_SUBJECT = `Contact Form: ${questionType} from ${name}`;
    EMAIL_BODY = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\n${message}`;
  } else if (req.body.type === "volunteer") {
    const { type, firstName, lastName, email, phoneNumber, receiveNews } = req.body;
    const newsStr = receiveNews ? "Yes" : "No";
    EMAIL_SUBJECT = `Volunteer Form: Sign up from ${firstName} ${lastName}`;
    EMAIL_BODY = `First Name: ${firstName} \nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nReceive News: ${newsStr}`;
  } else if (req.body.type === "newsletter") {
    const { type, firstName, lastName, email, quarterlyUpdates, specialUpdates } = req.body;
    const quarterlyStr = quarterlyUpdates ? "Yes" : "No";
    const specialStr = specialUpdates ? "Yes" : "No";
    EMAIL_SUBJECT = `Newsletter Form: Subscription by ${firstName} ${lastName}`;
    EMAIL_BODY = `First Name: ${firstName} \nLast Name: ${lastName}\nEmail: ${email}\nReceive Quarterly Updates: ${quarterlyStr}\nReceive Special Events Updates: ${specialStr}`;
  }

  try {
    const sentEmail = await sendContactEmail(EMAIL_SUBJECT, EMAIL_BODY);

    // Successfully sent email
    res.status(200).json(sentEmail);
  } catch (error) {
    next(error);
  }
};
