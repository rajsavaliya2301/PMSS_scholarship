import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { MdEditDocument, MdShareLocation } from "react-icons/md";
import { GrStorage } from "react-icons/gr";
import { VscGitStashApply } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';

const Studentdashboard = () => {
  const navigate = useNavigate();
  const logoutFunction =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('student')
    navigate('/')
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6 pb-20">
        <div className="px-6 md:px-12 lg:px-20 space-y-6 relative">
          <div className='flex justify-center'>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900">Students Portal</h1>
              <p className="text-gray-600 mt-2">Welcome to the portal. Please find the necessary links below.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Section */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center space-y-6">
              <CgProfile className="w-28 h-28" />
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">Profile</h2>
                <p className="text-gray-700">View your profile details.</p>
                <p className="mt-4 text-blue-600 cursor-pointer font-semibold hover:text-blue-800" onClick={() => navigate('/student/profile')}>Visit Profile</p>
              </div>
            </div>

            {/* Apply for Scholarship Section */}
            <div className="bg-gray-300 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center space-y-6">
              <VscGitStashApply className="h-28 w-28" />
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">Apply For Scholarship</h2>
                <p className="text-gray-700">Apply for the AY 2025-26 scholarship.</p>
                <p className="mt-4 text-blue-600 cursor-pointer font-semibold hover:text-blue-800" onClick={() => navigate('/student/apply')}>Apply Now</p>
              </div>
            </div>

            {/* Documents Details Section */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center space-y-6">
              <MdEditDocument className="h-28 w-28" />
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">Documents Details</h2>
                <p className="text-gray-700">Check your uploaded documents.</p>
                <p className="mt-4 text-blue-600 cursor-pointer font-semibold hover:text-blue-800" onClick={() => navigate('/student/documents')}>See now</p>
              </div>
            </div>

            {/* Track Your Payment Section */}
            <div className="bg-gray-300 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center space-y-6">
              <MdShareLocation className="h-28 w-28" />
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">Track Your Payment</h2>
                <p className="text-gray-700">Track your scholarship status.</p>
                <p className="mt-4 text-blue-600 cursor-pointer font-semibold hover:text-blue-800"  onClick={() => navigate('/student/track')}>Track Your Payment</p>
              </div>
            </div>

            {/* Edit Profile Section */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center space-y-6">
              <IoSettingsSharp className="h-28 w-28" />
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">Edit Your Profile</h2>
                <p className="text-gray-700">Request profile updates.</p>
                <p className="mt-4 text-blue-600 cursor-pointer font-semibold hover:text-blue-800" onClick={() => navigate('/student/edit')}>Edit Now</p>
              </div>
            </div>

            {/* Scholarship Records Section */}
            <div className="bg-gray-300 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center space-y-6">
              <GrStorage className="h-28 w-28" />
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">Scholarship Records</h2>
                <p className="text-gray-700">View past scholarship payments.</p>
                <p className="mt-4 text-blue-600 cursor-pointer font-semibold hover:text-blue-800" onClick={() => navigate('/student/recodes')}>Check out</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="bg-gray-300 hover:bg-gray-500 text-xs px-1 py-1 sm:text-lg text-black rounded sm:font-bold sm:px-2 sm:py-1 absolute top-[4rem] sm:top-[7rem] right-2 " onClick={logoutFunction}>Logout</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Studentdashboard;
