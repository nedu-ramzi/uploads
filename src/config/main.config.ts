import { config as dotenv } from 'dotenv';
import mongoose, { MongooseError } from 'mongoose';
import { v2 as cloudinary } from "cloudinary";
dotenv();

export const config = {
    server: {
        port: parseInt(process.env.PORT, 10),
        mode: process.env.MODE_ENV
    },
    database: async () => {
        await mongoose.connect(process.env.MONGOOSE_URI);
        mongoose.connection.on('error', (e: MongooseError) => {
            console.log(`We encountered the following error while trying to connect to the database: ${e.message}`)
        });
        mongoose.connection.on('open', () => {
            console.info('Mongo Database connection successful');
        });
    },
    cloudinary: cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    })
    
}