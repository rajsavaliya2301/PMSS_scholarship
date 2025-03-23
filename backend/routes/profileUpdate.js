const express = require("express");
const router = express.Router();
const StudentProfile = require('../models/StudentProfile'); // Import model

// Update student profile
router.put("/update-profile/:studentId", async (req, res) => {
    const { studentId } = req.params;
    const updatedData = req.body; // New details from frontend

    try {
        const profile = await StudentProfile.findOneAndUpdate(
            { studentId },
            { $set: updatedData },
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", profile });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get student profile by studentId
router.get('/update-profile/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;

        // Fetch student profile by studentId
        const studentProfile = await StudentProfile.findOne({ studentId });

        if (!studentProfile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        res.status(200).json(studentProfile);
    } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
