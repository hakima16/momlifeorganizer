const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// CORS — allows frontend on any port (3000, 3001, etc.)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// REQUIRED so Express can read JSON bodies
app.use(express.json());

// REQUIRED so Express can read form data (fixes login)
app.use(express.urlencoded({ extended: true }));

// DEBUG — shows EVERY request that hits the backend
app.use((req, res, next) => {
  console.log("🔥 Incoming request:", req.method, req.url);
  next();
});

// Test route
app.get("/", (req, res) => {
  res.send("MomLife Organizer backend is running!");
});

// ROUTES
app.use("/api/kids", require("./routes/kidRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));  // ✅ FIXED
app.use("/api/cleaning", require("./routes/cleaningRoutes"));
app.use("/api/shopping", require("./routes/shoppingRoutes"));
app.use("/api/vacations", require("./routes/vacationsRoutes"));
app.use("/api/auth", require("./routes/authRoutes")); // LOGIN ROUTE

// CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









