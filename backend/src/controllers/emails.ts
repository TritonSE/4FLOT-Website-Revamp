/*
 * Controller for the email route, /api/email.
 */
import { sendContactEmail } from "../../../backend/src/services/emails";

import { RequestHandler } from "express";

export const createEmail: RequestHandler = async (req, res, next) => {
  const { name, email, phone, subject, message, question } = req.body;

  try {
    const sentEmail = await sendContactEmail(name, email, phone, subject, message, question);

    // Successfully sent email
    res.status(200).json(sentEmail);
  } catch (error) {
    next(error);
  }
};
