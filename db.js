import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const mongooseURI = process.env.MONGO_URI_KEY;

const connectToMongo = () => {
    mongoose.connect( mongooseURI)
    console.log("connected to mongo succesfully");
};


export default connectToMongo;
