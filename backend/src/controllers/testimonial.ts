import { RequestHandler } from "express";
import TestimonialModel from "src/models/testimonial";

export const createTestimonial: RequestHandler = async (req, res, next) => {
  const { quote, description, image } = req.body;
  try {
    const testimonial = await TestimonialModel.create({
      quote: quote,
      description: description,
      image: image,
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
