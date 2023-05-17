import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDatabase = async () => {
    try {
        const dbName = process.env.DATABASE_NAME;
        const connectionUri = process.env.MONGO_URI;
        const dbConnection = await mongoose.connect(`${connectionUri}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        dbConnection.connection.on("error", (error) => {
          console.log(`Database Connection Failed with error ${error.message}`);
          process.exit(1);
        });
        console.log(`Database connected with host ${dbConnection.connection.host}`);
        return dbConnection;
    } catch (error) {
        console.log(`Database Connection Failed with error ${error.message}`);
        process.exit(1);
    }
}

export default connectDatabase;