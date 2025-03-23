const mongoose = require('mongoose');

const studentDocumentSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    documents: {
        studentPhoto: { type: Buffer, default: '' }, // Passport size photo of ex-student
        signaturePhoto: { type: Buffer, default: '' }, // Student signature photo
        esmCertificate: { type: Buffer, default: '' }, // Ex-serviceman certificate
        bonafideCertificate: { type: Buffer, default: '' }, // Bonafide certificate from college
        aadhaarCard: { type: Buffer, default: '' }, // Aadhaar card image
        bankPassbook: { type: Buffer, default: '' }, // Bank passbook photo
        lastYearResult: { type: Buffer, default: '' }, // Last year's marksheet
        collegeLetter: { type: Buffer, default: '' }, // College approval letter
        esmAffidavit: { type: Buffer, default: '' } // Affidavit of ESM
    }
});

module.exports = mongoose.model('StudentDocument', studentDocumentSchema);
