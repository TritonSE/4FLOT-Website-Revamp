import { InferSchemaType, Schema, model } from "mongoose";

const eventDetailsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  guidelines: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  imageURI: { type: String, required: true },
});

type EventDetails = InferSchemaType<typeof eventDetailsSchema>;

export default model<EventDetails>("EventDetails", eventDetailsSchema);
