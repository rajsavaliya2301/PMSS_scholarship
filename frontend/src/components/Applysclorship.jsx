import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTimes } from 'react-icons/fa';
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

const Applysclorship = () => {
    const studentId = localStorage.getItem('studentId')
    const [studentData, setStudentData] = useState(null);
    const [documents, setDocuments] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [photo, setPhoto] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [Applay, setApplay] = useState(false);

    const handleApply = async() => {
        setApplay(true)
        if (!isChecked) {
            alert("Please confirm that you have checked all details and required values are not N/A.");
            return;
        }
    
        try {
            const token = localStorage.getItem("token");
            const studentid=localStorage.getItem('studentId')
            const response = await axios.post(
                "http://localhost:5000/api/student-apply/req", 
                {
                    studentId: studentid, 
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if(response.status == 203){
                alert("You have already applied for scholarship")
            }else{
                alert("Application submitted successfully");
            }

        } catch (error) {
            console.error("Error applying:", error);
            alert("Failed to submit application. Please try again.");
        }
    };

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const token = localStorage.getItem("token");

                // Fetch student profile
                const profileRes = await axios.get(`http://localhost:5000/api/update-profile/${studentId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Fetch student documents list
                const docRes = await axios.get(`http://localhost:5000/api/student-documents/${studentId}`);

                // Fetch student photo
                const photoRes = await axios.get(`http://localhost:5000/api/student-documents/${studentId}/studentPhoto`, {
                    responseType: 'blob'
                });

                const reader = new FileReader();
                reader.readAsDataURL(photoRes.data);
                reader.onloadend = () => {
                    setPhoto(reader.result);
                };

                // Set student profile and documents
                setStudentData(profileRes.data);
                setDocuments(docRes.data.documents);
            } catch (error) {
                console.error("Error fetching student data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [studentId]); // Add dependency array to avoid infinite loops

    if (loading) return <p>Loading...</p>;
    if (!studentData) return <p>No student data found</p>;

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
            console.error("Error fetching document:", error);
            alert("Failed to fetch document");
        }
    };

    return (
        <>
            <Header />
            <div className="p-6 bg-gray-100">
                <h1 className="text-3xl font-bold">Application Details</h1>

                {/* Student Details */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6 flex justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold mb-5">Personal Information</h2>
                        <p><strong>Name:</strong> {studentData.name}</p>
                        <p><strong>DOB:</strong> {new Date(studentData.dob).toISOString().split("T")[0]}</p>
                        <p><strong>Email:</strong> {studentData.email}</p>
                        <p><strong>Phone:</strong> {studentData.phone}</p>
                        <p><strong>Father Name:</strong> {studentData.fatherName}</p>
                        <p><strong>Mother Name:</strong> {studentData.motherName}</p>
                    </div>
                    <div className="ml-6 ">
                        {photo ? (
                            <img src={photo} alt="Student" className="w-32 h-32 object-cover rounded-lg shadow-md" />
                        ) : (
                            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                                <span className="text-gray-500">No Photo</span>
                            </div>
                        )}
                    </div>

                </div>
                {/*Address Details */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6 ">
                    <h2 className="text-2xl font-semibold mb-4">Address Details</h2>
                    <p>
                        {[studentData.address?.houseNo, studentData.address?.street, studentData.address?.village]
                            .filter(value => value && value !== "N/A")
                            .join(", ")}
                    </p>
                    <p>
                        {[studentData.address?.city, studentData.address?.state, studentData.address?.pinCode]
                            .filter(value => value && value !== "N/A")
                            .join(", ")}
                    </p>
                </div>
                {/*Bank Details */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Bank Details</h2>
                    <p><strong>Account Holder:</strong> {studentData.bankDetails?.accountHolder || "N/A"}</p>
                    <p><strong>Bank Name:</strong> {studentData.bankDetails?.bankName || "N/A"}</p>
                    <p><strong>Branch Name:</strong> {studentData.bankDetails?.branchName || "N/A"}</p>
                    <p><strong>Account No:</strong> {studentData.bankDetails?.accountNo|| "N/A"}</p>
                    <p><strong>ifscCode:</strong> {studentData.bankDetails?.ifscCode || "N/A"}</p>
                </div>
                
                {/*Collage Details */}
                
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Collage Details</h2>
                    <p><strong>Collage Name:</strong> {studentData.collageDetails?.collageName || "N/A"}</p>
                    <p><strong>Collage Email:</strong> {studentData.collageDetails?.collageemail || "N/A"}</p>
                    <p><strong>Course:</strong> {studentData.collageDetails?.course || "N/A"}</p>
                    <p><strong>Total Marks/CGPA:</strong> {studentData.collageDetails?.totalMarks|| "N/A"}</p>
                    <p><strong>Obtained Marks/CGPA:</strong> {studentData.collageDetails?.obtainedMarks || "N/A"}</p>
                    <p><strong>College City:</strong> {studentData.collageDetails?.collageCity|| "N/A"}</p>
                    <p><strong>College State:</strong> {studentData.collageDetails?.collageState || "N/A"}</p>
                    <p><strong>PinCode:</strong> {studentData.collageDetails?.collagePinCode || "N/A"}</p>
                </div>

                {/* ESM Details */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <h2 className="text-2xl font-semibold mb-4">ESM Details</h2>
                    <p><strong>Service Type:</strong> {studentData.esmDetails?.serviceType || "N/A"}</p>
                    <p><strong>ESM Id:</strong> {studentData.esmDetails?.esmId || "N/A"}</p>
                    <p><strong>Enrollment Date:</strong> {studentData.esmDetails?.enrollmentDate ? new Date(studentData.esmDetails.enrollmentDate).toISOString().split("T")[0] : "N/A"}</p>
                    <p><strong>Discharge Date:</strong> {studentData.esmDetails?.dischargeDate ? new Date(studentData.esmDetails.dischargeDate).toISOString().split("T")[0] : "N/A"}</p>
                    <p><strong>Death Date(widow):</strong> {studentData.esmDetails?.dischargeDate ? new Date(studentData.esmDetails.dischargeDate).toISOString().split("T")[0] : "N/A"}</p>
                </div>

                {/* Documents Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <h2 className="text-2xl font-semibold">Uploaded Documents</h2>
                    {documents ? (
                        <table className="w-full mt-4 border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2 border">Document Name</th>
                                    <th className="p-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DOCUMENT_TYPES.map(({ key, label }) => (
                                    <tr key={key} className="bg-white">
                                        <td className="px-6 py-4 border-b">{label}</td>
                                        <td className="px-6 py-4 border-b">
                                            {documents[key] ? (
                                                <button onClick={() => handleViewDocument(key)} className="text-blue-500">
                                                    <FaEye />
                                                </button>
                                            ) : "N/A"}
                                        </td>
                                    </tr>
                                ))}
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
                            </tbody>
                        </table>
                    ) : (
                        <p>No documents uploaded</p>
                    )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <span className="text-gray-700">Check all details and confirm that required values are not "N/A".</span>
                    </label>
                    <button
                        onClick={handleApply}
                        disabled={!isChecked || Applay}
                        className={`mt-4 px-4 py-2 text-white rounded ${loading ? 'hover:cursor-not-allowed':''} ${isChecked ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
                    >
                        Apply
                    </button>
                </div>

            </div>
            <Footer />
        </>

    );
}
export default Applysclorship