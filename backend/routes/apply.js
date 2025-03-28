const express = require("express");
const sendEmail = require("../utils/sendEmail");
const StudentProfile = require("../models/StudentProfile"); 
const StudentDocument = require("../models/StudentDocument");
const AppStudent = require("../models/Application");

const router = express.Router();

router.post("/req", async (req, res) => {
    try {
        const { studentId } = req.body;

        // Find student profile
        const student = await StudentProfile.findOne({ studentId });
        const studentDocuments = await StudentDocument.findOne({ studentId });

        if (!student || !studentDocuments) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Check if application already exists
        const existingApplication = await AppStudent.findOne({ studentId });
        if (existingApplication) {
            return res.status(203).json({ message: "Application already submitted" });
        }

        // Generate applicationId
        const applicationId = Math.random().toString(36).substr(2, 12);

        // Create new application entry
        const studentData = new AppStudent({
            studentId: student.studentId,
            applicationId: applicationId,
            sagOfficerId: "N/A",
            financeOfficerId: "N/A",
            errorMessage: "",
            name: student.name,
            dob: student.dob,
            email: student.email,
            phone: student.phone,
            fatherName: student.fatherName || "N/A",
            motherName: student.motherName || "N/A",
            address: student.address || {},
            esmDetails: student.esmDetails || {},
            bankDetails: student.bankDetails || {},
            collageDetails: student.collageDetails || {},
            documents: studentDocuments ? studentDocuments.documents : {} // Ensure documents exist
        });

        await studentData.save();
        const mailOptions = {
            from:'23it106@charusat.edu.in',               
            to: student.email,                       
            subject: "Your PMSS Login Credentials",
            html: `<h2>Welcome to PMSS</h2>
                   <p>Your Application Id is: <b>${applicationId}</b></p>
                   <p>Using this id you can check status</p>
                   <p>Please keep this information safe.</p>`,
          };

        await sendEmail(mailOptions);

        res.status(201).json({ message: "Student Application created successfully" });
    } catch (error) {
        console.error("Error creating student application:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/progress/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await AppStudent.findOne({ studentId });

        if (!student) {
            return res.status(404).json({ message: "No data found" });
        }

        // Initialize progress object with default values
        let progress = {
            apply: "not_started",
            sag_officer_verification: "not_started",
            finance_officer_verification: "not_started",
            payment_done: "not_started",
            errorMessage: student.errorMessage || "",
        };

        // Stage 1: Apply
        if (student.applicationId) {
            progress.apply = "completed";
        } else {
            progress.apply = "error";
        }

        // Stage 2: SAG Officer Verification
        if (student.sagOfficerId !== "N/A" && student.errorMessage === "") {
            progress.sag_officer_verification = "completed";
        } else if (student.sagOfficerId !== "N/A" && student.errorMessage ) {
            progress.sag_officer_verification = "error";
        }

        // Stage 3: Finance Officer Verification
        if (student.financeOfficerId !== "N/A" && student.errorMessage === "") {
            progress.finance_officer_verification = "completed";
        } else if (student.financeOfficerId !== "N/A" && student.errorMessage) {
            progress.finance_officer_verification = "error";
        }

        // Stage 4: Payment Done
        if (progress.finance_officer_verification === "completed") {
            progress.payment_done = "completed";
        }

        
        // Send progress as the response
        res.status(200).json(progress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;
