// const mongoose = require("mongoose");
// require("dotenv").config();

// let isConnected = false;
// const connectDB = async () => {
//   try {
//     if (isConnected) return; // Use existing connection
//     // Mongoose.connect handles the connection for all your models
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ MongoDB Connected via Mongoose");
//   } catch (error) {
//     console.error("❌ Mongoose Connection Error:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
if (isConnected) {
console.log("=> Using existing database connection");
return;
}

// Debugging log: This will show in your Vercel logs
console.log("Checking MONGO_URI string…");

const uri = process.env.MONGO_URI;

if (!uri) {
console.error("❌ DB ERROR: MONGO_URI is undefined. Check Vercel Settings!");
return; // Stop here, don’t try to connect
}

try {
const db = await mongoose.connect(uri, {
// These options help prevent timeouts on serverless
bufferCommands: false,
});

isConnected = db.connections[0].readyState;
console.log("✅ MongoDB Connected via Mongoose");
} catch (error) {
console.error("❌ Mongoose Connection Error:", error.message);
// REMOVED process.exit(1) - Let the function stay alive to report the error
}
};

module.exports = connectDB;