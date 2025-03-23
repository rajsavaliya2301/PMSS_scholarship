import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { FaEye, FaCheckCircle, FaUpload } from 'react-icons/fa';

// Define all expected document types
const DOCUMENT_TYPES = [
    { key: "studentPhoto", label: "Student Photo" },
    { key: "signaturePhoto", label: "Signature Photo" },
    { key: "esmCertificate", label: "ESM Certificate" },
    { key: "bonafideCertificate", label: "Bonafide Certificate" },
    { key: "aadhaarCard", label: "Aadhaar Card" },
    { key: "bankPassbook", label: "Bank Passbook" },
    { key: "lastYearResult", label: "Last Year Result" },
    { key: "collegeLetter", label: "College Approval Letter" },
    { key: "esmAffidavit", label: "ESM Affidavit" }
];

const Studentdocument = ({ studentId }) => {
    const [documents, setDocuments] = useState({});
    const [selectedFiles, setSelectedFiles] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDocuments();
    }, [studentId]);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/student-documents/${studentId}`);
            if (response.data && response.data.documents) {
                setDocuments(response.data.documents);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setSelectedFiles({ ...selectedFiles, [name]: files[0] });
    };

    const handleUpload = async () => {
        const formData = new FormData();
        Object.keys(selectedFiles).forEach((key) => {
            formData.append(key, selectedFiles[key]);
        });
        formData.append('studentId', studentId);
        try {
            // Pass studentId in the API request
            await axios.post(`http://localhost:5000/api/student-documents/upload/${studentId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Documents uploaded successfully!');
            fetchDocuments(); // Refresh document list after upload
        } catch (error) {
            console.error('Error uploading documents:', error);
            alert('Failed to upload documents');
        }
    };

    return (
        <>
            <Header />
            <div className="py-16 px-24">
                <h2 className="text-2xl font-bold mb-6">Uploaded Documents</h2>

                {loading ? <p>Loading documents...</p> : (
                    <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg shadow-black">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-600 uppercase">Document Name</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-600 uppercase">Status</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-600 uppercase">View</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-600 uppercase">Upload</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DOCUMENT_TYPES.map(({ key, label }) => (
                                <tr key={key} className="bg-white">
                                    <td className="px-6 py-4 border-b text-sm font-medium text-gray-900">{label}</td>
                                    <td className="px-6 py-4 border-b text-sm font-medium">
                                        {documents[key] ? (
                                            <FaCheckCircle className="text-green-500 text-lg" />
                                        ) : (
                                            <span className="text-red-500">Not Uploaded</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm font-medium">
                                        {documents[key] ? (
                                            <a href={`http://localhost:5000/${documents[key]}`} target="_blank" rel="noopener noreferrer">
                                                <FaEye className="text-blue-500 text-lg cursor-pointer" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm font-medium">
                                        <input type="file" name={key} onChange={handleFileChange} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="mt-6">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2" onClick={handleUpload}>
                        <FaUpload /> Save Changes
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Studentdocument;
