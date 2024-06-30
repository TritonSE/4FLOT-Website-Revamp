import { InferSchemaType, Schema, model } from "mongoose";

const testimonialSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  type: { type: String, required: true },
});

type Testimonial = InferSchemaType<typeof testimonialSchema>;

export default model<Testimonial>("Testimonial", testimonialSchema);
