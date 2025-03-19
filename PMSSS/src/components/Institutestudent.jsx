import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Institutestudent = () => {
  return (
    <>
      <Header/>
      <div className='py-16 px-24 '>
        <div className='min-w-full '>
            <div className='flex'>
                <h2 className="text-xl font-bold  hover:bg-gray-100 p-3 rounded-t-xl" >Student Details</h2>
            </div>
        </div>
      <div className="max-w-4xl  pt-4 pb-20 my-8 shadow shadow-gray-300 rounded p-6">
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
        <div className='min-w-full '>
          <div className='flex'>
              <h2 className="text-xl font-bold  hover:bg-gray-100 p-3 rounded-t-xl" >Documents Details</h2>
          </div>
        </div>
        <table className='min-w-full table-auto border-gray-300 shadow-sm shadow-black '>
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Document Name
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            See Document
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            View Document                                                                                                    
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white">
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                            Aadhar crad
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                            abc-xyz
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium" onClick={()=>{navigate('/institudeportal/stuentprofile')}}>
                            View details
                        </td>   
                    </tr>
                    
                </tbody>
        </table>
        <div className='flex justify-between'>
          <button className='mt-10 rounded-lg font-bold px-4 py-1 bg-gray-600 text-white hover:text-[red]'>Error</button>
          <button className='mt-10 rounded-lg font-bold px-4 py-1 bg-gray-600 text-white hover:text-[green]'>Approve</button>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Institutestudent