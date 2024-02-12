import { InferSchemaType, Schema, model } from "mongoose";

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

type event = InferSchemaType<typeof eventSchema>;

export default model<event>("event", eventSchema);
