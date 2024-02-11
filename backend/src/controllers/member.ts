import { RequestHandler } from "express";
import MemberModel from "src/models/member";
import { Types } from "mongoose";

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
