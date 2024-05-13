import { InferSchemaType, Schema, model } from "mongoose";

const pageEditorSchema = new Schema({
  page: { type: String, required: true },
  pageSections: [{ type: Schema.Types.Mixed, required: true }],
});

type PageEditor = InferSchemaType<typeof pageEditorSchema>;

export default model<PageEditor>("PageEditor", pageEditorSchema);
