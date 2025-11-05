// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // Make sure this connects to MongoDB
const booksRoute = require('./Routes/booksRoute');
const userRoute = require('./Routes/userRoute');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ Middleware: Parse JSON
app.use(express.json());

// ✅ Configure CORS (for React frontend)
const allowedOrigins = [
  "http://localhost:5173", // Vite default
  "http://127.0.0.1:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// ✅ Optional: Fallback CORS headers for safety
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ✅ Root endpoint (for testing)
app.get("/", (req, res) => {
  res.send("✅ Server is running and CORS is working!");
});

// ✅ Routes
app.use("/api/books", booksRoute);
app.use("/api/users", userRoute);

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
