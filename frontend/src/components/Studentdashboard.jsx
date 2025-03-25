import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { GrStorage } from "react-icons/gr";
import { MdShareLocation } from "react-icons/md";
import { VscGitStashApply } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';




const Studentdashboard = () => {

    const navigate=useNavigate();
  return (
   <>
    <Header/>
    
    <div className="min-h-screen bg-gray-100 p-6 pb-20">
      
      <div className="px-20 space-y-6">
       <div className='flex'>
       <div className="text-center mb-8 mx-auto  ">
          <h1 className="text-3xl font-extrabold text-gray-900 mx-auto text-center">Students Portal</h1>
          <p className="text-gray-600 mt-2">Welcome to the portal. Please find the necessary links below.</p>
        </div>
        <div className='h-[4.5rem] w-[4.5rem] bg-black rounded-full '>

        </div>
       </div>
        

        <div className="grid grid-cols-3 gap-x-32 gap-6">

        {/* Your Profile Section */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center space-y-6 h-96  w-80">
            <CgProfile className="w-28 h-28 object-contain rounded-lg"/>
          <div>
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <p className="text-gray-700">This section contains your profile which contains all the data the student have entered to the portal.</p>
            <p  className="mt-4 inline-block text-blue-600 cursor-pointer font-semibold hover:text-blue-800" onClick={() =>{
        navigate('/student/profile')
    }}>Visit Profile</p>
          </div>
        </div>

        {/* Apply for Scholarship Section */}
        <div className="bg-gray-300 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col h-96 w-80 items-center space-y-6">
            <VscGitStashApply className="h-28 w-28 object-contain rounded-lg" />
          <div>
            <h2 className="text-xl font-bold mb-4">Apply For Scholarship</h2>
            <p className="text-gray-700 text-md">Login with your ID and PASSWORD to fill your Fresh and Renewal Scholarship application form for AY 2025-26.</p>
            <p  className="mt-4 inline-block font-semibold cursor-pointer text-blue-600 hover:text-blue-800" onClick={()=>{
        navigate('/student/apply')
    }}>Apply Now</p>
          </div>
        </div>

        {/* Documents uploaded at first time Details Section */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col h-96 w-80 items-center space-y-6">
            <MdEditDocument className="h-28 w-28 object-contain rounded-lg" />
          <div>
            <h2 className="text-xl font-bold mb-4">Documents Details</h2>
            <p className="text-gray-700">Check out the documents you have uploaded still date.</p>
            <p className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold cursor-pointer" onClick={()=>{
                navigate('/student/documents')
            }}  >See now</p>
          </div>
        </div>

        {/* Track Your Payment Section */}
        <div className="bg-gray-300 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col h-96 w-80 items-center space-y-6">
            <MdShareLocation className="h-28 w-28 object-contain rounded-lg"/>
          <div>
            <h2 className="text-xl font-bold mb-4">Track Your Payment</h2>
            <p className="text-gray-700">Track your scholarship disbursement status on PFMS portal.</p>
            <p  className="mt-4 inline-block text-blue-600  hover:text-blue-800 font-semibold cursor-pointer" >Track Your Payment</p>
          </div>
        </div>

        {/* tracking the payment */}

        {/* Aadhaar Seva Kendra Section */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col h-96 w-80 items-center space-y-6">
            <IoSettingsSharp className="h-28 w-28 object-contain  brightness-90 contrast-75 rounded-lg" />
          <div>
            <h2 className="text-xl font-bold mb-4">Edit Your Profile</h2>
            <p className="text-gray-700">Make the edit request of your details if you have done any.</p>
            <p to="/aadhaar-seva-kendra" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold cursor-pointer" onClick={()=>{
                navigate('/student/edit')}} > Edit Now</p>
          </div>
        </div>

        {/* Previous shcolarship records Seeding Section */}
        <div className="bg-gray-300 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col h-96 w-80 items-center space-y-6">
            <GrStorage className="h-28 w-28 object-conatin rounded-lg"/>
          <div>
            <h2 className="text-xl font-bold mb-4">Scholarship Records</h2>
            <p className="text-gray-700">Check out your previous scholarship amounts that are given to you and your institute.</p>
            <p to="/aadhaar-seeding" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold cursor-pointer" onClick={()=>{
                navigate('/student/recodes')
            }}
            >Check out</p>
          </div>
        </div>



        </div>
      </div>
    </div>
    <Footer/>
   </>
  )
}

export default Studentdashboard