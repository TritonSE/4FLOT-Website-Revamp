import { InferSchemaType, Schema, model } from "mongoose";

const recordsSchema = new Schema({
  card: { type: String, required: true },
  date: { type: String, required: true },
});

type Record = InferSchemaType<typeof recordsSchema>;

export default model<Record>("Editrecords", recordsSchema);
