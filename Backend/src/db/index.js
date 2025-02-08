import mongoose from "mongoose";
import { DB_NAME } from "../constans.js";

export const connectDB = async () => {
  try {
    const DBInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URL}/${DB_NAME}`
    );
    console.log("[+] DB connected succefully: ", DBInstance.connection.host);
  } catch (error) {
    console.error("[-] Connection to DB failed: ", error);
    process.exit(1);
  }
};
