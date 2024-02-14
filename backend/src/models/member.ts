import { InferSchemaType, Schema, model } from "mongoose";

const memberSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  profilePictureURL: { type: String },
});

type Member = InferSchemaType<typeof memberSchema>;

export default model<Member>("Member", memberSchema);
