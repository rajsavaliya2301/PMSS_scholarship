import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'


const Instituteportal = () => {
    // let sec = true;
    const [sec , setSec ] = useState(true)
    const navigate=useNavigate()
  return (
    <>
    <Header/>
    <div className=" py-16 px-24 ">
        <div className='flex justify-between pb-5'>
            <h2 className="text-3xl font-bold mb-6">Institute Verification Portal</h2>
            <div className='h-[4.5rem] w-[4.5rem] bg-black rounded-full '></div>
        </div>
        <div className='min-w-full '>
            <div className='flex'>
                <button className="text-xl font-bold  hover:bg-gray-200 p-3 rounded-t-xl" onClick={()=>{
                    setSec(true);
                }}>Panding Request</button>
                <button className='text-xl font-bold  hover:bg-gray-200 px-3  rounded-t-xl' onClick={()=>{
                    setSec(false)
                }} >Aproved Request</button>
            </div>

        {
            sec ? (
                <table className={`min-w-full table-auto border-t-0 border-gray-300 shadow-lg shadow-black `}>
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Profile
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Student ID
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Student Name
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Application ID
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Click ToView                                                                                                    
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white">
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                           <img src="" alt="" className='bg-black h-10 w-10 rounded-full' />
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                            23itabc
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                            abc-xyz
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                            asdfghjkl
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium" onClick={()=>{navigate('/institudeportal/stuentprofile')}}>
                            View details
                        </td>   
                    </tr>
                    <tr className="bg-white">
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                           <img src="" alt="" className='bg-black h-10 w-10 rounded-full' />
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                            23itabc
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                            abc-xyz
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                            asdfghjkl
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                            <a href="">View details</a>
                        </td>   
                    </tr>
                </tbody>
            </table>
            ) : (
                <table className={`min-w-full table-auto border-t-0 border-gray-300 shadow-lg shadow-black `}>
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Student ID
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Student Name
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Application ID
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white">
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                            23itabc
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                            abc-xyz
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium">
                            asdfghjkl
                        </td>   
                    </tr>
                </tbody>
            </table>
            )
        }
        



            
        </div>

        </div>
    <Footer/>
    </>
  )
}

export default Instituteportal