import { RequestHandler } from "express";
import MemberModel from "src/models/member";
import { Types } from "mongoose";
import validationErrorParser from "src/util/validationErrorParser";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

export const createMember: RequestHandler = async (req, res, next) => {
  const { name, role, profilePictureURL } = req.body;
  try {
    const member = await MemberModel.create({
      name: name,
      role: role,
      profilePictureURL: profilePictureURL,
    });
    res.status(201).json(member);
  } catch (error) {
    next(error);
  }
};

export const getMember: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const member = Types.ObjectId.isValid(id) ? await MemberModel.findById(id) : null;
    res.status(200).json(member);
  } catch (error) {
    next(error);
  }
};

export const getAllMembers: RequestHandler = async (req, res, next) => {
  try {
    const members = await MemberModel.find({});
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};

export const updateMember: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { id } = req.params;
  // if (id !== req.body._id) {
  //   // If the _id in the URL does not match the _id in the body, bad request
  //   res.status(400);
  // }

  try {
    validationErrorParser(errors);

    const member = await MemberModel.findByIdAndUpdate(id, req.body);
    if (member === null) {
      // No event found
      res.status(404);
    }
    const updatedMember = await MemberModel.findById(id);
    if (updatedMember === null) {
      // No event found, something went wrong
      res.status(404);
    }
    res.status(200).json(updatedMember);
  } catch (error) {
    next(error);
  }
};

export const deleteMember: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const member = await MemberModel.findByIdAndDelete(id);

    if (!member) {
      throw createHttpError(404, "Member not found.");
    }

    res.status(200).json(member);
  } catch (error) {
    next(error);
  }
};
