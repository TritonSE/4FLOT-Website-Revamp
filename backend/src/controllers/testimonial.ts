import { RequestHandler } from "express";
import TestimonialModel from "src/models/testimonial";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import validationErrorParser from "src/util/validationErrorParser";

export const createTestimonial: RequestHandler = async (req, res, next) => {
  const { title, description, image, type } = req.body;
  try {
    const testimonial = await TestimonialModel.create({
      title: title,
      description: description,
      image: image,
      type: type,
    });

    res.status(201).json(testimonial);
  } catch (error) {
    next(error);
  }
};

export const getAllTestimonials: RequestHandler = async (req, res, next) => {
  try {
    const testimonials = await TestimonialModel.find({});
    res.status(200).json(testimonials);
  } catch (error) {
    next(error);
  }
};

export const getAllQuotes: RequestHandler = async (req, res, next) => {
  try {
    const testimonials = await TestimonialModel.find({ type: "quote" });
    res.status(200).json(testimonials);
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { id } = req.params;

  if (id !== req.body._id) {
    // If the _id in the URL does not match the _id in the body, bad request
    res.status(400);
  }

  try {
    validationErrorParser(errors);

    const testimonial = await TestimonialModel.findByIdAndUpdate(id, req.body);
    if (testimonial === null) {
      // No newsletter found
      res.status(404);
    }
    const updatedTestimonial = await TestimonialModel.findById(id);
    if (updatedTestimonial === null) {
      // No testimonial found, something went wrong
      res.status(404);
    }
    res.status(200).json(updatedTestimonial);
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const testimonial = await TestimonialModel.findByIdAndDelete(id);

    if (!testimonial) {
      throw createHttpError(404, "Testimonial not found.");
    }

    res.status(200).json(testimonial);
  } catch (error) {
    next(error);
  }
};
