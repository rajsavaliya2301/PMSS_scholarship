const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const sendEmail = require("../utils/sendEmail");
const StudentProfile = require("../models/StudentProfile"); // Import StudentProfile
const StudentDocument = require("../models/StudentDocument");
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
      ltoken: "",
      role,
    });

    // Automatically Create Student Profile
    const newProfile = new StudentProfile({
      studentId, // Link to Student collection
      name,
      email,
      phone,
      password,
      dob,
      fatherName: "N/A",
      motherName: "N/A",
      address: {},
      esmDetails: {},
      bankDetails: {},
      collegeDetails: {},
    });
    const newdocument = new StudentDocument({
      studentId,
      documents: {},
    });
    const mailOptions = {
      from: "23it106@charusat.edu.in", // Sender's email
      to: email, // Receiver's email
      subject: "Your PMSS Login Credentials",
      html: `<h2>Welcome to PMSS</h2>
             <p>Your Student ID: <b>${studentId}</b></p>
             <p>Your Password: <b>${password}</b></p>
             <p>Please keep this information safe.</p>`,
    };
    await sendEmail(mailOptions);

    await newStudent.save();
    await newdocument.save();
    await newProfile.save();

    res.status(200).json({ message: "Student registered successfully" });
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

    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    student.ltoken = token;

    res.status(200).json({
      token,
      role: student.role,
      studentId: student.studentId,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.post("/sendpassword", async (req, res) => {
  const { studentId } = req.body;  // Expecting email to be sent in request body

  try {
    // Find student by email
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(400).json({ message: "Invalid Id" });
    }

    // Generate random password
    const password = Math.random().toString(36).slice(-8);

    // Set password in the student data, hash it before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    student.password = hashedPassword;

    // Save updated student data with hashed password
    await student.save();

    // Email content setup
    const mailOptions = {
      from: "23it106@charusat.edu.in",  // Sender's email address
      to: student.email,  // Recipient's email address
      subject: "Your PMSS Login Credentials",
      html: `
        <h2>Welcome to PMSS</h2>
        <p>Your Password is: <b>${password}</b></p>
        <p>Using this Password You Create Your Password.</p>
        <p>Please keep this information safe.</p>
      `,
    };

    // Send email with the login credentials
    await sendEmail(mailOptions);

    // Respond with success message
    res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error("Error in sending password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/forgot-password", async (req, res) => {
  try {
    const { email, phone, name, password, newPassword } = req.body;
    // Find the user by email Student
    const user = await Student.findOne({ email });
    const userp = await StudentProfile.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if phone and DOB match
    if (user.phone !== phone || user.name !== name) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      user.password = hashedPassword;
      userp.password = hashedPassword;
      await user.save();
      await userp.save();
      res.json({ message: "Password updated successfully" });
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
