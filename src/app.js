const express = require("express");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const mappingRoutes = require("./routes/mappingRoutes");

const app = express();

app.use(express.json());
app.get("/", (req, res) =>
  res.status(200).json({ message: "Healthcare API is running" }),
);
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/mappings", mappingRoutes);
app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use((error, req, res, next) => {
  return res.status(500).json({ message: "Unexpected server error" });
});

module.exports = app;
