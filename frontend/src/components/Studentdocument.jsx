import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { FaEye, FaCheckCircle, FaUpload, FaTimes ,FaTrash} from 'react-icons/fa';

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

const Studentdocument = () => {
    const [documents, setDocuments] = useState({});
    const [selectedFiles, setSelectedFiles] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const studentId=localStorage.getItem('studentId')

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
            await axios.post(`http://localhost:5000/api/student-documents/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Documents uploaded successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error uploading documents:', error);
            alert('Failed to upload documents');
        }
    };

    const handleViewDocument = async (docType) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/student-documents/${studentId}/${docType}`, {
                responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = URL.createObjectURL(blob);
            setModalContent(url);
            setModalOpen(true);
        } catch (error) {
            console.error('Error fetching document:', error);
            alert('Failed to fetch document');
        }
    };
    const handleDeleteDocument = async (docType) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/student-documents/delete/${studentId}/${docType}`);
            alert(response.data.message);
            fetchDocuments(); // Refresh document list after deletion
        } catch (error) {
            console.error('Error deleting document:', error);
            alert('Failed to delete document');
        }
    };

    return (
        <>
            <Header />
            <div className="py-16 px-24">
                <h2 className="text-2xl font-bold mb-6">Uploaded Documents(PDF Files,JPG Photo Only)</h2>

                {loading ? <p>Loading documents...</p> : (
                    <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg shadow-black">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 border-b">Document Name</th>
                                <th className="px-6 py-3 border-b">Status</th>
                                <th className="px-6 py-3 border-b">View</th>
                                <th className="px-6 py-3 border-b">Delete</th>
                                <th className="px-6 py-3 border-b">Upload</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DOCUMENT_TYPES.map(({ key, label }) => (
                                <tr key={key} className="bg-white">
                                    <td className="px-6 py-4 border-b">{label}</td>
                                    <td className="px-6 py-4 border-b">
                                        {documents[key] ? <FaCheckCircle className="text-green-500" /> : "Not Uploaded"}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {documents[key] ? (
                                            <button onClick={() => handleViewDocument(key)} className="text-blue-500">
                                                <FaEye />
                                            </button>
                                        ) : "N/A"}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {documents[key] ? (
                                            <button
                                            className="text-red-500"
                                            onClick={() => handleDeleteDocument(key)}
                                        ><FaTrash />
                                        </button>
                                        ) : "N/A"}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <input type="file" name={key} onChange={handleFileChange} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2" onClick={handleUpload}>
                    <FaUpload /> Save Changes
                </button>

                {/* Document View Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-5 rounded-lg shadow-lg w-3/4 h-3/4 relative">
                            <button className="absolute top-2 right-2 text-red-600" onClick={() => setModalOpen(false)}>
                                <FaTimes size={20} />
                            </button>
                            {modalContent && (
                                modalContent.includes("image") ? (
                                    <img src={modalContent} alt="Document Preview" className="w-full h-full object-contain" />
                                ) : (
                                    <iframe src={modalContent} title="Document Viewer" className="w-full h-full"></iframe>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Studentdocument;
