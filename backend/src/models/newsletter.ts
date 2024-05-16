import { InferSchemaType, Schema, model } from "mongoose";

const newsletterSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
});

type Newsletters = InferSchemaType<typeof newsletterSchema>;

export default model<Newsletters>("Newsletters", newsletterSchema);
