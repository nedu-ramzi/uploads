import { Schema, model } from "mongoose";
const imageSchema = new Schema({
    imageName: {
        type: String,        
    },
    imageUrl:{
        type: String,
    }
}, { timestamps: true });

export const ImageUpload = model('ImageUpload', imageSchema)