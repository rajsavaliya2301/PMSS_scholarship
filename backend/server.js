const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const studentDocumentsRoutes = require('./routes/studentDocuments');


const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const editstudent= require("./routes/profileUpdate")

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Paperless Scholarship System!");
});

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api", editstudent);
app.use('/api/student-documents', studentDocumentsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
