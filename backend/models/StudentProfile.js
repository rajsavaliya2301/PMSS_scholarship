const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true, }, // Reference to Auth collection
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password:{type: String,},
    fatherName: { type: String, default: "N/A" },
    motherName: { type: String, default: "N/A" },
    address: {
        houseNo: { type: String, default: "N/A" },
        street: { type: String, default: "N/A" },
        town: { type: String, default: "N/A" },
        village: { type: String, default: "N/A" },
        city: { type: String, default: "N/A" },
        state: { type: String, default: "N/A" },
        district: { type: String, default: "N/A" },
        pinCode: { type: String, default: "N/A" }
    },
    esmDetails: {
        serviceType: { type: String, default: "N/A" },
        esmId: { type: String, default: "N/A" },
        enrollmentDate: { type: Date, default: null },
        dischargeDate: { type: Date, default: null },
        deathDate: { type: Date, default: null }
    },
    bankDetails: {
        accountHolder: { type: String, default: "N/A" },
        bankName: { type: String, default: "N/A" },
        branchName: { type: String, default: "N/A" },
        accountNo: { type: String, default: "N/A" },
        ifscCode: { type: String, default: "N/A" }
    },
    collegeDetails: {
        collegeName: { type: String, default: "N/A" },
        collegeCity: { type: String, default: "N/A" },
        collegeState: { type: String, default: "N/A" },
        collegePinCode: { type: String, default: "N/A" },
        course: { type: String, default: "N/A" },
        totalMarks: { type: String, default: "N/A" },
        obtainedMarks: { type: String, default: "N/A" }
    }
});

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
module.exports = StudentProfile;
