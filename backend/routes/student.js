const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Student = require("../models/Student");

const router = express.Router();

// Get Student Profile (Protected Route)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
