import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Header';
import Footer from './Footer';

const Institutestudent = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <>
      <Header />
      <div className='py-16 px-24 '>
        <div className='min-w-full '>
          <div className='flex'>
            <h2 className="text-xl font-bold hover:bg-gray-100 p-3 rounded-t-xl">Student Details</h2>
          </div>
        </div>
        <div className="max-w-4xl pt-4 pb-20 my-8 shadow shadow-gray-300 rounded p-6">
          {/* Student Details */}
          <div className="grid grid-cols-2 gap-6">
            {/* Name */}
            <div className="bg-gray-50 p-4 rounded-lg shadow w-80 h-auto">
              <h3 className="text-sm font-semibold text-gray-600">Name</h3>
              <p className="text-xl mt-3 font-bold text-gray-900"> 'N/A'</p>
            </div>
            
            {/* Other details */}
            {/* (Keep all other details unchanged) */}
          </div>
        </div>
        <div className='min-w-full '>
          <div className='flex'>
            <h2 className="text-xl font-bold hover:bg-gray-100 p-3 rounded-t-xl">Documents Details</h2>
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
                Aadhar Card
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                abc-xyz
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium cursor-pointer text-blue-500 hover:underline"
                  onClick={() => navigate('/institudeportal/studentprofile')}>
                View details
              </td>
            </tr>
          </tbody>
        </table>
        <div className='flex justify-center'>
          <button className='m-5 rounded-lg font-bold px-4 py-2 bg-gray-600 text-white hover:text-[red]'>Error</button>
          <button className='m-5 rounded-lg font-bold px-4 py-2 bg-gray-600 text-white hover:text-[green]'>Approve</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Institutestudent;
