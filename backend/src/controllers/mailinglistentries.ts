// mailingListEntriesController.ts
import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import MailingListEntries from "src/models/mailinglistentries"; // Assuming this is your Mongoose model for mailing list entries
import validationErrorParser from "src/util/validationErrorParser";

export const getAllMailingListEntries: RequestHandler = async (req, res, next) => {
  try {
    const mailingListEntries = await MailingListEntries.find({});

    if (!mailingListEntries || mailingListEntries.length === 0) {
    
      return res.status(200).json({ message: "No mailing list entries found." });
    }

    res.status(200).json(mailingListEntries);
  } catch (error) {
    
    next(error);
  }
};

export const getMailingListEntry: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const mailingListEntry = await MailingListEntries.findOne({ id });

    if (!mailingListEntry) {
      throw createHttpError(404, "Mailing list entry not found.");
    }

    res.status(200).json(mailingListEntry);
  } catch (error) {
    next(error);
  }
};

export const createMailingListEntry: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { id, lastName, firstName, memberSince, email } = req.body;

  try {
    validationErrorParser(errors);

    const existingEntry = await MailingListEntries.findOne({ id });
    if (existingEntry) {
      throw createHttpError(409, "Mailing list entry with provided id already exists.");
    }

    const mailingListEntry = await MailingListEntries.create({
      id,
      lastName,
      firstName,
      memberSince,
      email,
    });

    res.status(201).json(mailingListEntry);
  } catch (error) {
    next(error);
  }
};

export const updateMailingListEntry: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { id } = req.params;
  const { lastName, firstName, memberSince, email } = req.body;

  try {
    validationErrorParser(errors);

    const updatedMailingListEntry = await MailingListEntries.findOneAndUpdate(
      { id },
      { lastName, firstName, memberSince, email },
      { new: true } // To return the updated document
    );

    if (!updatedMailingListEntry) {
      return res.status(404).json({ message: "Mailing list entry not found." });
    }

    res.status(200).json(updatedMailingListEntry);
  } catch (error) {
    next(error);
  }
};

export const deleteMailingListEntry: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedMailingListEntry = await MailingListEntries.findByIdAndDelete(id);

    if (!deletedMailingListEntry) {
      return res.status(404).json({ message: "Mailing list entry not found." });
    }

    // Optionally, you can return the deleted entry in the response
    res.status(200).json({ message: "Mailing list entry deleted successfully.", deletedEntry: deletedMailingListEntry });
  } catch (error) {
    next(error);
  }
};