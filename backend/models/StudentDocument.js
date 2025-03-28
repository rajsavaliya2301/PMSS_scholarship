const mongoose = require('mongoose');

const studentDocumentSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
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
});

module.exports = mongoose.model('StudentDocument', studentDocumentSchema);
