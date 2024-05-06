import { InferSchemaType, Schema, model } from "mongoose";

const pageEditorSchema = new Schema({
  page: { type: String, required: true },
  ph_subtitle: { type: String, required: true },
  ph_images: { type: String, required: true },
  s1_title: { type: String, required: true },
  s1_text: { type: String, required: true },
});

type PageEditor = InferSchemaType<typeof pageEditorSchema>;

export default model<PageEditor>("PageEditor", pageEditorSchema);
