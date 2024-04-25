import { InferSchemaType, Schema, model } from "mongoose";

const mailinglistSchema = new Schema({
_id: { type: String, required: true },
  id: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  memberSince: { type: String, required: true },
  email: { type: String, required: true },
});

type MailingListEntries = InferSchemaType<typeof mailinglistSchema>;

export default model<MailingListEntries>("MailingListEntries", mailinglistSchema);