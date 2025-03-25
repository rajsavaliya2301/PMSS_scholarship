const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role:{type: String,},
});

module.exports = mongoose.model("Student", StudentSchema);
