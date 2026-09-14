import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Trying to Connect .....");

        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${connect.connection.host}`);

    } catch (err) {
        console.log(err);
        console.log("MongoDb Error");

        process.exit(1);

    }
}

export default connectDB;