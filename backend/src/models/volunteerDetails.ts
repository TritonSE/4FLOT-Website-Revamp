import { InferSchemaType, Schema, model } from "mongoose";

const volunteerDetailsSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    signed_up_for_updates: {
        type: Boolean,
        default: false
    }
});
  
type VolunteerDetails = InferSchemaType<typeof volunteerDetailsSchema>;
  
export default model<VolunteerDetails>("EventDetails", volunteerDetailsSchema);