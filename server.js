// // // const express = require("express");
// // // const cors = require("cors");
// // // const dotenv = require("dotenv");
// // // const mongoose = require("mongoose");
// // // const connectDB = require("./config/db");
// // // const path = require("path");
// // // dotenv.config();

// // // // const connectDB = async () => {
// // // //   try {
// // // //     await mongoose.connect(process.env.MONGO_URI);
// // // //     console.log("✅ MongoDB connected");
// // // //   } catch (err) {
// // // //     console.error("❌ MongoDB connection error:", err);
// // // //     process.exit(1);
// // // //   }
// // // // };

// // // connectDB();


// // // const app = express();

// // // app.use(cors());
// // // app.use(express.json());
// // // app.use(express.static(path.join(__dirname, "./dist")));

// // // app.use("/api/tickets", require("./routes/ticketRoutes"));

// // // app.get("/", (req, res) => {
// // //   res.send("Support CRM API Running");
// // // });

// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //   console.log(`Server running on ${PORT}`);
// // // });
// // const express = require("express");
// // const cors = require("cors");
// // const dotenv = require("dotenv");
// // const mongoose = require("mongoose");
// // const connectDB = require("./config/db");
// // const path = require("path");

// // dotenv.config();

// // // 1. Connect to Database (ensure your config/db.js doesn’t use process.exit)
// // connectDB();

// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // // 2. API Routes (MUST come before static files/catch-all)
// // app.use("/api/tickets", require("./routes/ticketRoutes"));

// // // 3. Serve Static Files (React Build)
// // // Note: If you deploy as a monorepo, ensure './dist' is the correct relative path
// // app.use(express.static(path.join(__dirname, "./dist")));

// // // 4. Catch-All Route for SPA (React Router)
// // // If the request isn’t an API call, send the index.html
// // app.get("/:path*", (req, res) => {
// // if (!req.path.startsWith("/api")) {
// // res.sendFile(path.join(__dirname, "./dist", "index.html"));
// // }
// // });

// // // 5. Conditional Listen & Export
// // // Only run app.listen if NOT on Vercel (local development)
// // if (process.env.NODE_ENV !== "production") {
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// // console.log(`Server running on ${PORT}`);
// // });
// // }

// // // CRITICAL: Export the app for Vercel
// // module.exports = app;
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const connectDB = require("./config/db");
// const path = require("path");

// dotenv.config();

// // 1. Connect to Database
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // 2. API Routes
// app.use("/api/tickets", require("./routes/ticketRoutes"));

// // 3. Serve Static Files
// app.use(express.static(path.join(__dirname, "./dist")));

// // 4. THE FIX: Catch-All Middleware
// // We use app.use() without a path string to avoid the Regex 'PathError'
// app.use((req, res, next) => {
// // If the request is for an API, but reached here, it means the API route doesn’t exist
// if (req.path.startsWith("/api")) {
// return res.status(404).json({ message: "API route not found" });
// }
// // For everything else, serve the index.html
// res.sendFile(path.join(__dirname, "./dist", "index.html"), (err) => {
// if (err) {
// // If index.html is missing, move to next middleware (which is Express 404)
// next();
// }
// });
// });

// // 5. Conditional Listen & Export
// if (process.env.NODE_ENV !== "production") {
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
// console.log(`Server running on ${PORT}`);
// });
// }

// module.exports = app;

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

// 1. Connect to Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// 2. API Routes
app.use("/api/tickets", require("./routes/ticketRoutes"));

// — CHANGE START —

// 3. Serve Static Files
// Use process.cwd() to ensure it looks in the root of the deployed project
const distPath = path.join(process.cwd(), "dist");
app.use(express.static(distPath));

// 4. THE FIX: Catch-All Middleware
app.use((req, res, next) => {
if (req.path.startsWith("/api")) {
return res.status(404).json({ message: "API route not found" });
}

// Point specifically to the index.html inside that dist folder
res.sendFile(path.join(distPath, "index.html"), (err) => {
if (err) {
console.error("Dist folder path attempted:", distPath);
next(); // Fallback to Express default 404
}
});
});

// — CHANGE END —

// 5. Conditional Listen & Export
if (process.env.NODE_ENV !== "production") {
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server running on ${PORT}`);
});
}

module.exports = app;