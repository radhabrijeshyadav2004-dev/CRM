const { MongoClient } = require("mongodb");
require("dotenv").config();
const client = new MongoClient(process.env.MONGO_URI);

const dbname = "CRM";

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await client.connect();
    const db = client.db(dbname);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;