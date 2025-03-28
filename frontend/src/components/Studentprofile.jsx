import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Studentprofile = () => {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState(null);
    const studentId = localStorage.getItem('studentId') // Replace with actual student ID (can be from authentication state)

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/update-profile/${studentId}`);
                setStudentData(response.data);
            } catch (error) {
                console.error("Error fetching student profile:", error);
            }
        };

        fetchStudentProfile();
    }, [studentId]);

    if (!studentData) {
        return <p className="text-center mt-10">Loading student profile...</p>;
    }

    return (
        <>
            <Header />
            <div className="flex justify-center">
                <div className="max-w-4xl bg-gray-100 pt-4 pb-20 my-8 shadow-lg rounded p-6">
                    <div className="flex justify-end">
                        <button
                            className="px-6 py-2 mb-2 bg-gray-500 text-white rounded-lg hover:bg-gray-800 hover:font-bold"
                            onClick={() => navigate('/student/edit')}
                        >
                            Edit
                        </button>
                    </div>

                    {/* Student Details */}
                    <div className="grid grid-cols-2 gap-6">
                        <ProfileCard title="Name" value={studentData.name} />
                        <ProfileCard title="Father's Name" value={studentData.fatherName} />
                        <ProfileCard title="Mother's Name" value={studentData.motherName} />
                        <ProfileCard title="Address" value={`${studentData.address?.village},${studentData.address?.city}, ${studentData.address?.state}`} />
                        <ProfileCard title="Phone Number" value={studentData.phone} />
                        <ProfileCard title="ESM Id Number" value={studentData.esmDetails?.esmId} />
                        <ProfileCard title="College Name" value={studentData.collageDetails?.collageName} />
                        <ProfileCard title="College Email" value={studentData.collageDetails?.collageemail || "N/A"} />
                        <ProfileCard title="Collage Address" value={`${studentData.collageDetails?.collageCity}, ${studentData.collageDetails?.collageState}`} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const ProfileCard = ({ title, value }) => (
    <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
        <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
        <p className="text-xl mt-3 font-bold text-gray-900">{value || 'N/A'}</p>
    </div>
);

export default Studentprofile;
