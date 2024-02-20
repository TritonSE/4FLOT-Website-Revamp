import { RequestHandler } from "express";
import TestimonialModel from "src/models/testimonial";

export const createTestimonial: RequestHandler = async (req, res, next) => {
  const { title, description, image, type } = req.body;
  console.log("here");
  try {
    const testimonial = await TestimonialModel.create({
      title: title,
      description: description,
      image: image,
      type: type,
    });
    console.log("here");
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
