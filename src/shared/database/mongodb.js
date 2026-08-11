import mongoose from 'mongoose';
import {config} from "../../api/config.js";

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(config.database);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDb;