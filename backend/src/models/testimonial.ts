import { InferSchemaType, Schema, model } from "mongoose";

const testimonialSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
});

type testimonial = InferSchemaType<typeof testimonialSchema>;

export default model<testimonial>("testimonial", testimonialSchema);
