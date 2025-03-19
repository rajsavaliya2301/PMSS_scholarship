import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { FaEye, FaCheckCircle } from 'react-icons/fa'; // Importing icons
const Studentdocument = () => {
  return (
    <>
    <Header/>
    <div className=" py-16 px-24 ">
            <h2 className="text-2xl font-bold mb-6">Uploaded Documents</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg shadow-black">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Document Name
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            View
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* {documents.map((doc, index) => ( */}
                        {/* <tr key={index} className="bg-white"> */}
                        <tr className="bg-white">
                            <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium text-gray-900">
                                {/* {doc.name} */}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                                {/* {doc.file ? ( */}
                                    <FaCheckCircle className="text-green-500 text-lg" />
                                {/* ) : ( */}
                                    <span className="text-red-500">Not Uploaded</span>
                                {/* )} */}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                                {/* {doc.file ? ( */}
                                    <FaEye
                                    className="text-blue-500 text-lg cursor-pointer"
                                       // onClick={() => handleViewDocument(doc.file)}
                                    />
                                {/* ) : ( */}
                                    <span className="text-gray-400">N/A</span>
                                {/* )} */}
                            </td>
                        </tr>
                    {/* ))} */}
                </tbody>
            </table>
        </div>

    <Footer/>
    </>
  )
}

export default Studentdocument