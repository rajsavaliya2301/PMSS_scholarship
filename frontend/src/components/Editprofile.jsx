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
        collageDetails: {}
    });
    const formatDate = (isoString) => {
        return new Date(isoString).toISOString().split('T')[0];
    };

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const token = localStorage.getItem('token');
                const studentId = localStorage.getItem('studentId');
                const response = await axios.get(`http://localhost:5000/api/update-profile/${studentId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data) {
                    setStudentData({
                        studentId: response.data.studentId || '',
                        name: response.data.name || '',
                        dob: formatDate(response.data.dob) || '',
                        email: response.data.email || '',
                        phone: response.data.phone || '',
                        fatherName: response.data.fatherName || '',
                        motherName: response.data.motherName || '',
                        address: response.data.address || {},
                        esmDetails: response.data.esmDetails || {},
                        bankDetails: response.data.bankDetails || {},
                        collageDetails: response.data.collageDetails || {}
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
        if (name === 'email' || name === 'dob' || name === 'studentId') return;
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
        const { phone, address, bankDetails, collageDetails, esmDetails } = studentData;
    
        if (esmDetails) {
            ['enrollmentDate', 'dischargeDate', 'deathDate'].forEach((dateKey) => {
                let dateString = esmDetails[dateKey];
    
                // Ensure it's a string before using split
                if (typeof dateString === "string" && dateString.trim() !== "") {
                    let [day, month, year] = dateString.split(/[- /]/); 
                    if (day && month && year) { 
                        esmDetails[dateKey] = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
                    }
                }
            });
        }
    
        // Validate Phone Number
        if (!/^[0-9]{10}$/.test(phone)) {
            alert('Phone number must be exactly 10 digits');
            return;
        }
    
        // Validate Pin Code
        if (address.pinCode !== 'N/A' && !/^[0-9]{6}$/.test(address.pinCode)) {
            alert('Pin Code must be exactly 6 digits');
            return;
        }
        // Validate College Email
        if (collageDetails.collageemail !== 'N/A' && !/^[a-zA-Z0-9._%+-]+@charusat\.edu\.in$/.test(collageDetails.collageemail)) {
            alert('Invalid college email! It must be a @charusat.edu.in email.');
            return;
        }
    
        // // Validate Bank Account Number (if needed)
        // if (bankDetails.accountNumber !== 'N/A' && isNaN(bankDetails.accountNumber)) {
        //     alert('Account Number must be a valid number');
        //     return;
        // }
    
        // // Validate Marks
        // if (collageDetails.obtainedMarks !== 'N/A' && collageDetails.totalMarks !== 'N/A') {
        //     if (isNaN(collageDetails.obtainedMa  rks) || isNaN(collageDetails.totalMarks)) {
        //         alert('Marks should be numeric');
        //         return;
        //     }
        //     if (parseInt(collageDetails.obtainedMarks) > parseInt(collageDetails.totalMarks)) {
        //         alert('Total Marks should be greater than Obtained Marks');
        //         return;
        //     }
        // }
    
        try {
            const token = localStorage.getItem('token');
            const studentId = studentData.studentId;
    
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
                                    value={studentData[field] || ''}
                                    onChange={(e) => handleChange(e, null)}
                                    className="p-2 w-full border rounded mt-1"
                                    disabled={field === 'email' || field === 'dob' || field === 'studentId'} // Disable email field
                                />
                            </div>
                        ))}
                    </div>

                    {/* Address Details */}
                    {['address', 'esmDetails', 'bankDetails', 'collageDetails'].map((section) => (
                        <div key={section} className="bg-white p-6 rounded-lg shadow-lg mt-6">
                            <h2 className="text-2xl font-bold">{section.replace(/([A-Z])/g, ' $1').trim()}</h2>
                            {Object.entries(studentData[section] || {}).map(([key, value]) => (
                                <div key={key} className="flex flex-col mt-3">
                                    <label className="font-semibold">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={value || ''}
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
