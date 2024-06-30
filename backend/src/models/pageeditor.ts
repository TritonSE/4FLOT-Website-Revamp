import { InferSchemaType, Schema, model } from "mongoose";

const pageEditorSchema = new Schema({
  name: { type: String, required: true },
  isEdited: { type: Boolean, required: true },
  fields: [
    {
      name: { type: String, required: true },
      type: { type: String, required: true },
      data: { type: Schema.Types.Mixed, required: true },
    },
  ],
});

type PageEditor = InferSchemaType<typeof pageEditorSchema>;

export default model<PageEditor>("PageEditor", pageEditorSchema);
