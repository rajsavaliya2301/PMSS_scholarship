const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const sendEmail = require("../utils/sendEmail");
const StudentProfile = require("../models/StudentProfile"); // Import StudentProfile
const StudentDocument =require("../models/StudentDocument")
const router = express.Router();

// Generate Student ID based on DOB (DDMMYY format)
const generateStudentId = (dob) => {
  const dateOfBirth = new Date(dob);
  const day = String(dateOfBirth.getDate()).padStart(2, "0");
  const month = String(dateOfBirth.getMonth() + 1).padStart(2, "0");
  const year = String(dateOfBirth.getFullYear()).slice(2);

  return `PMSS@${day}${month}${year}`;
};


router.post("/signup", async (req, res) => {
  const { name, email, phone, dob } = req.body;

  try {
    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists!" });
    }

    // Generate student ID and password
    const studentId = generateStudentId(dob);
    const password = Math.random().toString(36).slice(-8);
    console.log(studentId, password);

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = "student"; 

    // Create new student in Student collection
    const newStudent = new Student({
      name,
      email,
      phone,
      dob,
      studentId,
      password: hashedPassword,
      role, 
    });

    await newStudent.save();

    // Automatically Create Student Profile
    const newProfile = new StudentProfile({
      studentId,  // Link to Student collection
      name,
      email,
      phone,
      dob,
      password,
      fatherName: "N/A",
      motherName: "N/A",
      address: {},
      esmDetails: {},
      bankDetails: {},
      collegeDetails: {}
    });
    const newdocument=new StudentDocument({
      studentId,
      documents:{}

    });
    await newdocument.save();
    await newProfile.save(); // Save profile to DB

    res.status(200).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.post("/login", async (req, res) => {
  const { studentId, password } = req.body;

  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Fetch Student Profile
    const studentProfile = await StudentProfile.findOne({ studentId });

    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      role: student.role,
      studentId: student.studentId,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;
