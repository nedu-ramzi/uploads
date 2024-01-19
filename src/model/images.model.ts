import { Schema, model } from "mongoose";
const imageSchema = new Schema({
    imageUrl:{
        type: [String],
        required: true
    }
}, { timestamps: true });

export const ImageUpload = model('ImageUpload', imageSchema)