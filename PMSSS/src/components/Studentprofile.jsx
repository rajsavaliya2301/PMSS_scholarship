import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Studentprofile = () => {
  return (
    <>
      <Header/>
      <div className='flex justify-around'>
      <div className="max-w-4xl bg-gray-100 pt-4 pb-20 my-8 shadow shadow-gray-300 rounded p-6">
            {/* Student Details */}
            <div className="grid grid-cols-2 gap-6  ">
                {/* Name */}
                <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
                    <h3 className="text-sm font-semibold text-gray-600">Name</h3>
                    <p className="text-xl mt-3 font-bold text-gray-900"> 'N/A'</p>
                </div>

                {/* Father's Name */}
                <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
                    <h3 className="text-sm font-semibold text-gray-600">Father's Name</h3>
                    <p className="text-xl mt-3 font-bold text-gray-900"> 'N/A'</p>
                </div>

                {/* Mother's Name */}
                <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
                    <h3 className="text-sm font-semibold text-gray-600">Mother's Name</h3>
                    <p className="text-xl mt-3 font-bold text-gray-900">'N/A'</p>
                </div>

                {/* Address */}
                <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
                    <h3 className="text-sm font-semibold text-gray-600">Address</h3>
                    <p className="text-xl mt-3 font-bold text-gray-900">'N/A'</p>
                </div>

                {/* Phone Number */}
                <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
                    <h3 className="text-sm font-semibold text-gray-600">Phone Number</h3>
                    <p className="text-xl mt-3 font-bold text-gray-900"> 'N/A'</p>
                </div>

                {/* Aadhaar Card */}
                <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
                    <h3 className="text-sm font-semibold text-gray-600">Aadhaar Card</h3>
                    <p className="text-xl mt-3 font-bold text-gray-900">'N/A'</p>
                </div>

                {/* College */}
                <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
                    <h3 className="text-sm font-semibold text-gray-600">College</h3>
                    <p className="text-xl mt-3 font-bold text-gray-900">'N/A'</p>
                </div>

                {/* College ID */}
                <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
                    <h3 className="text-sm font-semibold text-gray-600">College ID</h3>
                    <p className="text-xl mt-3 font-bold text-gray-900">'N/A'</p>
                </div>

                {/* 12th School Name */}
                <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
                    <h3 className="text-sm font-semibold text-gray-600">12th School Name</h3>
                    <p className="text-xl mt-3 font-bold text-gray-900">'N/A'</p>
                </div>

                {/* 12th Marks Details */}
                <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
                    <h3 className="text-sm font-semibold text-gray-600">12th Marks Details</h3>
                    <p className="text-xl mt-3 font-bold text-gray-900"> 'N/A'</p>
                </div>

                {/* 10th School Name */}
                <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
                    <h3 className="text-sm font-semibold text-gray-600">10th School Name</h3>
                    <p className="text-xl mt-3 font-bold text-gray-900"> 'N/A'</p>
                </div>

                {/* 10th Marks Details */}
                <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
                    <h3 className="text-sm font-semibold text-gray-600">10th Marks Details*</h3>
                    <p className="text-xl mt-3 font-bold text-gray-900"> 'N/A'</p>
                </div>
            </div>
        </div>
        <div className='h-[4.5rem] w-[4.5rem] bg-black rounded-full mt-[2rem]'>
        </div>
      </div>
       
      <Footer/>
    </>
  )
}

export default Studentprofile