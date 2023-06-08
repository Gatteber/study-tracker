import mongoose from "mongoose";
import getErrorMessage from "../middleware/getErrorMessage";

//assert type from environment variable
const MONGO_URI = process.env.MONGO_URI as string;
const connectDB = async () => {
    if (!MONGO_URI) {    
        throw new Error("Error: No environment variable found.");
    }
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${getErrorMessage(err)}`);
    }
}

export default connectDB;