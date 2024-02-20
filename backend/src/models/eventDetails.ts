import { InferSchemaType, Schema, model } from "mongoose";

const eventDetailsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  guidlines: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  image: String, // TODO: Change this if necessary
  // also not sure how to handle images
  //
  // volunteers: [volunteerSchema],
  // not sure if this is something we need to do
});

type EventDetails = InferSchemaType<typeof eventDetailsSchema>;

export default model<EventDetails>("EventDetails", eventDetailsSchema);
