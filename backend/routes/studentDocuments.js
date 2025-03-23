const express = require('express');
const multer = require('multer');
const path = require('path');
const StudentDocument = require('../models/StudentDocument'); // Import schema

const router = express.Router();

// Multer storage configuration for memory storage (saving file buffer)
const storage = multer.memoryStorage();

const upload = multer({ storage });

// Upload or update student documents
router.post('/upload', upload.fields([
    { name: 'studentPhoto' },
    { name: 'signaturePhoto' },
    { name: 'esmCertificate' },
    { name: 'bonafideCertificate' },
    { name: 'aadhaarCard' },
    { name: 'bankPassbook' },
    { name: 'lastYearResult' },
    { name: 'collegeLetter' },
    { name: 'esmAffidavit' }
]), async (req, res) => {
    try {
        const { studentId } = req.body; // Get studentId from the request body
        const files = req.files;

        if (!studentId) {
            return res.status(400).json({ error: 'Student ID is required' });
        }

        // Prepare the file data to save as buffer
        const documentData = {
            studentPhoto: files.studentPhoto ? files.studentPhoto[0].buffer : null,
            signaturePhoto: files.signaturePhoto ? files.signaturePhoto[0].buffer : null,
            esmCertificate: files.esmCertificate ? files.esmCertificate[0].buffer : null,
            bonafideCertificate: files.bonafideCertificate ? files.bonafideCertificate[0].buffer : null,
            aadhaarCard: files.aadhaarCard ? files.aadhaarCard[0].buffer : null,
            bankPassbook: files.bankPassbook ? files.bankPassbook[0].buffer : null,
            lastYearResult: files.lastYearResult ? files.lastYearResult[0].buffer : null,
            collegeLetter: files.collegeLetter ? files.collegeLetter[0].buffer : null,
            esmAffidavit: files.esmAffidavit ? files.esmAffidavit[0].buffer : null
        };

        let studentDocument = await StudentDocument.findOne({ studentId });

        if (studentDocument) {
            // Update existing document with the new file data
            studentDocument.documents = { ...studentDocument.documents, ...documentData };
            await studentDocument.save();
        } else {
            // Create a new document entry
            studentDocument = new StudentDocument({ studentId, documents: documentData });
            await studentDocument.save();
        }

        res.status(200).json({ message: 'Documents uploaded successfully', data: studentDocument });
    } catch (error) {
        console.error('Error uploading documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get student documents
router.get('/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const studentDocument = await StudentDocument.findOne({ studentId });

        if (!studentDocument) {
            return res.status(404).json({ message: 'No documents found for this student' });
        }

        res.status(200).json(studentDocument);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
