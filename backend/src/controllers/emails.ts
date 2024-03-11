/*
 * Controller for the email route, /api/email.
 * passes error handling off to /src/util/validationErrorParser.ts
 */
import { sendContactEmail } from "../../../backend/src/services/emails";

import { RequestHandler } from "express";
// import { validationResult } from "express-validator";
// import validationErrorParser from "src/util/validationErrorParser";

export const createEmail: RequestHandler = async (req, res, next) => {
  // export async function createEmail(name: string, email: string, message: string) {
  //   const errors = validationResult(req);
  const { name, email, phone, subject, message, question } = req.body;

  try {
    //   validationErrorParser is a helper that throws 400 if there are errors
    // validationErrorParser(errors);
    const sentEmail = await sendContactEmail(name, email, phone, subject, message, question);

    // successfully sent email
    res.status(200).json(sentEmail);
  } catch (error) {
    next(error);
  }
};
