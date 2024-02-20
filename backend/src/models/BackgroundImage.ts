import { InferSchemaType, Schema, model } from "mongoose";



export enum BackgroundImagePages {
  TEAM = "TEAM",
  HOME = "HOME",
}

const backgroundImageSchema = new Schema({
  imageURI: { type: String, required: true },
  page: { type: String , required: true },
});

type BackgroundImage  = InferSchemaType<typeof backgroundImageSchema>;

export default model<BackgroundImage>("BackgroundImage", backgroundImageSchema);