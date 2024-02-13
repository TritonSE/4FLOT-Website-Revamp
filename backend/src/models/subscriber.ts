/*
 * Defines the schema for a newsletter subscriber
 */

import { InferSchemaType, Schema, model } from "mongoose";

const subscriberSchema = new Schema({
  email: { type: String, required: true },
});

type Subscriber = InferSchemaType<typeof subscriberSchema>;

export default model<Subscriber>("Subscriber", subscriberSchema);
