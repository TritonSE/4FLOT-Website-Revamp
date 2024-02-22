import { InferSchemaType, Schema, model } from "mongoose";

const eventDetailsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  guidlines: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  imageURI: { type: String, required: true }, // TODO: Change this if necessary
  // empty by default, stores _id of volunteers
  volunteers: { type: [String], required: false, default: [] },
});

type EventDetails = InferSchemaType<typeof eventDetailsSchema>;

export default model<EventDetails>("EventDetails", eventDetailsSchema);
