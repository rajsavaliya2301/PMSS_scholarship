import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const EditProfile = () => {
    const [studentData, setStudentData] = useState({
        studentId: '',
        name: '',
        dob: '',
        email: '',
        phone: '',
        fatherName: '',
        motherName: '',
        address: {},
        ESMDetails: {},
        bankDetails: {},
        collegeDetails: {}
    });

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const token = localStorage.getItem('token');
                const studentId = localStorage.getItem('studentId'); // Ensure studentId is stored
                const response = await axios.get(`http://localhost:5000/api/update-profile/${studentId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data) {
                    setStudentData({
                        studentId: response.data.studentId || '',
                        name: response.data.name || '',
                        dob: response.data.dob || '',
                        email: response.data.email || '',
                        phone: response.data.phone || '',
                        fatherName: response.data.fatherName || '',
                        motherName: response.data.motherName || '',
                        address: response.data.address || {},
                        ESMDetails: response.data.esmDetails || {},
                        bankDetails: response.data.bankDetails || {},
                        collegeDetails: response.data.collegeDetails || {}
                    });
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudentData();
    }, []);

    const handleChange = (e, section) => {
        const { name, value } = e.target;
        setStudentData((prevData) => {
            if (section) {
                return {
                    ...prevData,
                    [section]: {
                        ...prevData[section],
                        [name]: value || ''
                    }
                };
            }
            return {
                ...prevData,
                [name]: value || ''
            };
        });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const studentId = studentData.studentId; // Ensure studentId is included

            await axios.put(`http://localhost:5000/api/update-profile/${studentId}`, studentData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating student data:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <>
            <Header />
            <div className='px-4 py-5'>
                <h1 className="text-3xl ml-5 font-extrabold">Edit Student Information</h1>
                <div className="mt-8 px-20">
                    
                    {/* Personal Information */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold">Personal Details</h2>
                        {['studentId', 'name', 'dob', 'email', 'phone', 'fatherName', 'motherName'].map((field) => (
                            <div key={field} className="flex flex-col mt-3">
                                <label className="font-semibold">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                                <input 
                                    type="text" 
                                    name={field} 
                                    value={studentData[field] || ''}  // Ensure value is a string
                                    onChange={(e) => handleChange(e, null)} 
                                    className="p-2 w-full border rounded mt-1"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Address Details */}
                    {['address', 'ESMDetails', 'bankDetails', 'collegeDetails'].map((section) => (
                        <div key={section} className="bg-white p-6 rounded-lg shadow-lg mt-6">
                            <h2 className="text-2xl font-bold">{section.replace(/([A-Z])/g, ' $1').trim()}</h2>
                            {Object.entries(studentData[section] || {}).map(([key, value]) => (
                                <div key={key} className="flex flex-col mt-3">
                                    <label className="font-semibold">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                                    <input 
                                        type="text" 
                                        name={key} 
                                        value={value || ''}  // Ensure value is a string
                                        onChange={(e) => handleChange(e, section)} 
                                        className="p-2 w-full border rounded mt-1"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Save Button */}
                    <div className="flex justify-end mt-6">
                        <button onClick={handleSave} className="px-6 py-2 bg-green-500 text-white rounded-lg">Save Changes</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EditProfile;
