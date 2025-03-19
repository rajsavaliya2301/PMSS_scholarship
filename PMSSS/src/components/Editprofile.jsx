import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { FaUser, FaTrash, FaEye, FaEdit, FaPlus } from 'react-icons/fa'; // Import required icons
import { useState } from 'react';

const Editprofile = () => {
    const [registrationData, setRegistrationData] = useState({
        name: 'John Doe',
        fatherName: 'Robert Doe',
        motherName: 'Jane Doe',
        address: '123 Main St',
        phoneNumber: '1234567890',
        adhaarCard: 'XXXX-XXXX-XXXX',
        college: 'ABC College',
        collegeId: 'COL123456',
        school12th: 'XYZ High School',
        marks12th: '85%',
        school10th: 'ABC School',
        marks10th: '90%'
    });


  return (
    <>
    <Header/>
    <div className='px-4 py-5'>
            <div className="flex justify-between">
                <h1 className="text-3xl ml-5 font-extrabold">Edit Student Information</h1>
            </div>

            <div className="mt-8 px-20">
                {/* Profile Picture and Personal Info Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Student Details</h2>
                        <button  className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
                            <FaEdit className="mr-2" /> Edit
                        </button>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-6">
                        {[
                            { label: 'Name', value: registrationData.name, field: 'name' },
                            { label: "Father's Name", value: registrationData.fatherName, field: 'fatherName' },
                            { label: "Mother's Name", value: registrationData.motherName, field: 'motherName' },
                            { label: 'Address', value: registrationData.address, field: 'address' },
                            { label: 'Phone Number', value: registrationData.phoneNumber, field: 'phoneNumber' },
                            { label: 'Aadhaar Card', value: registrationData.adhaarCard, field: 'adhaarCard' },
                            { label: 'College', value: registrationData.college, field: 'college' },
                            { label: 'College ID', value: registrationData.collegeId, field: 'collegeId' },
                            { label: '12th School', value: registrationData.school12th, field: 'school12th' },
                            { label: '12th Marks', value: registrationData.marks12th, field: 'marks12th' },
                            { label: '10th School', value: registrationData.school10th, field: 'school10th' },
                            { label: '10th Marks', value: registrationData.marks10th, field: 'marks10th' }
                        ].map(({ label, value, field }, index) => (
                            <div key={index} className="flex flex-col">
                                <label className="font-semibold">{label}</label>
                                <input
                                    type="text"
                                    value={value}
                                   // disabled={!isEditing}
                                   // onChange={(e) => handleInputChange(e, field)}
                                    className={`p-2 w-full border  rounded mt-1`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Document Section */}

                {/* Submit Button */}
                {/* {isEditing && ( */}
                    <div className="flex justify-end mt-6">
                        <button  className="px-6 py-2 bg-green-500 text-white rounded-lg">
                            Save Changes
                        </button>
                    </div>
                {/* )} */}
            </div>
        </div>
    <Footer/>
    </>
  )
}

export default Editprofile