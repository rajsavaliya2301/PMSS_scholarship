const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    applicationId: { type: String, required: true, unique: true },
    sagOfficerId: { type: String, default: "N/A" },
    financeOfficerId: { type: String, default: "N/A" },
    errorMessage: { type: String, default: "" },

    name: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },

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

    collageDetails: {
        collageName: { type: String, default: "N/A" },
        collageCity: { type: String, default: "N/A" },
        collageState: { type: String, default: "N/A" },
        collagePinCode: { type: String, default: "N/A" },
        collageEmail: { type: String, default: "N/A" },
        course: { type: String, default: "N/A" },
        totalMarks: { type: String, default: "N/A" },
        obtainedMarks: { type: String, default: "N/A" }
    },

    documents: {
        studentPhoto: { type: Buffer },
        signaturePhoto: { type: Buffer },
        esmCertificate: { type: Buffer },
        bonafideCertificate: { type: Buffer },
        aadhaarCard: { type: Buffer },
        bankPassbook: { type: Buffer },
        lastYearResult: { type: Buffer },
        collegeLetter: { type: Buffer },
        esmAffidavit: { type: Buffer }
    }
}, { timestamps: true });

const AppStudent = mongoose.model("AppStudent", StudentSchema);
module.exports = AppStudent;
