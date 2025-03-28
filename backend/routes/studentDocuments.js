const express = require('express');
const multer = require('multer');
const StudentDocument = require('../models/StudentDocument');

const router = express.Router();
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
        const { studentId } = req.body;
        if (!studentId) return res.status(400).json({ error: 'Student ID is required' });

        const files = req.files;
        let studentDocument = await StudentDocument.findOne({ studentId });

        // Prepare document data in buffer format
        const documentData = {};
        Object.keys(files).forEach((key) => {
            documentData[key] = files[key][0].buffer;
        });

        if (studentDocument) {
            studentDocument.documents = { ...studentDocument.documents, ...documentData };
            await studentDocument.save();
        } else {
            studentDocument = new StudentDocument({ studentId, documents: documentData });
            await studentDocument.save();
        }

        res.status(200).json({ message: 'Documents uploaded successfully' });
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

        // Convert buffer to Base64 for frontend display
        const documentsBase64 = {};
        for (const key in studentDocument.documents) {
            if (studentDocument.documents[key]) {
                documentsBase64[key] = `data:image/png;base64,${studentDocument.documents[key].toString('base64')}`;
            }
        }

        res.status(200).json({ studentId, documents: documentsBase64 });
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Route to get a specific document by type
router.get('/:studentId/:docType', async (req, res) => {
    try {
        const { studentId, docType } = req.params;
        const studentDocument = await StudentDocument.findOne({ studentId });

        if (!studentDocument || !studentDocument.documents[docType]) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const fileBuffer = studentDocument.documents[docType];

        // Set appropriate headers based on file type (assuming images or PDFs)
        res.setHeader('Content-Type', 'application/pdf'); // Default to PDF
        if (docType.includes('Photo') || docType.includes('photo')) {
            res.setHeader('Content-Type', 'image/png'); // Change if different format
        }

        res.send(fileBuffer);
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Route to delete a specific document by type
// Route to delete a specific document by type (buffer data)
router.delete('/delete/:studentId/:docType', async (req, res) => {
    try {
        const { studentId, docType } = req.params;
        
        // Find the student's document record
        const studentDocument = await StudentDocument.findOne({ studentId });

        // Check if the student document exists and the docType is valid
        if (!studentDocument || !studentDocument.documents[docType]) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Check the current file stored in the buffer field
        const documentBuffer = studentDocument.documents[docType];

        // If there's no buffer (i.e., no file is uploaded), respond accordingly
        if (!documentBuffer || documentBuffer.length === 0) {
            return res.status(400).json({ message: 'No document to delete' });
        }

        // Log the document data before deletion (optional for debugging)
        console.log(`Deleting document of type: ${docType} for student: ${studentId}`);

        // Delete the buffer (file) from the document field
        studentDocument.documents[docType] = null;

        // Save the updated student document back to the database
        await studentDocument.save();

        // Respond with a success message
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
