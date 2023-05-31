import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDatabase = async () => {
    try {
      const dbName = process.env.DATABASE_NAME;
      const connectionUrl = process.env.MONGO_URL;
      console.log(connectionUrl);
        const dbConnection = await mongoose.connect(`${connectionUrl}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        dbConnection.connection.on("error", (error) => {
          console.log(`Database Connection Failed with error ${error.message}`);
        });
        console.log(
          `Database connected with host ${dbConnection.connection.host}`
        );
    } catch (error) {
      console.log(`Database Connection Failed with error ${error.message}`);
    }
}

export default connectDatabase;