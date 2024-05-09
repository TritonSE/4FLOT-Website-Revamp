/*
 * Defines the schema for a newsletter subscriber
 */

import { InferSchemaType, Schema, model } from "mongoose";

const subscriberSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  memberSince: { type: String },
  quarterlyUpdates: { type: Boolean },
  specialUpdates: { type: Boolean },
});

type Subscriber = InferSchemaType<typeof subscriberSchema>;

export default model<Subscriber>("Subscriber", subscriberSchema);
