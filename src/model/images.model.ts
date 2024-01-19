import { Schema, model } from "mongoose";
const imageSchema = new Schema({
    imageUrl:{
        type: String,
    }
}, { timestamps: true });

export const ImageUpload = model('ImageUpload', imageSchema)