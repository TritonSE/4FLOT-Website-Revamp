import { RequestHandler } from "express";
import VolunteerDetails from "../models/volunteerDetails";

export const getVolunteer: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const volunteer = await VolunteerDetails.findById(id);

    if (!volunteer) {
      return res.status(404).json({ error: "Volunteer not found." });
    }

    res.status(200).json(volunteer);
  } catch (error) {
    next(error);
  }
};

export const getAllVolunteers: RequestHandler = async (req, res, next) => {
  try {
    const volunteers = await VolunteerDetails.find({});

    if (!volunteers || volunteers.length === 0) {
      return res.status(200).json({ message: "No volunteers yet!" });
    }

    res.status(200).json(volunteers);
  } catch (error) {
    next(error);
  }
};

export const addVolunteer: RequestHandler = async (req, res, next) => {
  // Extract volunteer data from the request body
  const volunteerData = req.body;

  try {
    // Check if any of the required fields are missing
    const requiredProperties = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "signed_up_for_updates",
    ];

    for (const prop of requiredProperties) {
      if (!Object.prototype.hasOwnProperty.call(volunteerData, prop)) {
        return res
          .status(400)
          .json({ error: `Missing property: ${prop}. Please provide all required fields.` });
      }
    }

    // Create a new volunteer using the extracted data
    const newVolunteer = await VolunteerDetails.create(volunteerData);

    // Respond with the newly created volunteer
    return res.status(201).json(newVolunteer);
  } catch (error) {
    next(error);
  }
};
