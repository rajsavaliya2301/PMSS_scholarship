import React from 'react'
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
   
  return (
    <>
    <footer className="bg-gray-800 px-8 text-white py-6 w-[100%]">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">PMSS</h1>
          <p className="mt-2 text-gray-400 text-sm sm:text-lg">
            PMSS - Prime Minister's Scholarship Scheme
          </p>
          <p className="text-gray-400 text-sm sm:text-lg">
            Supporting education for the children of ex-servicemen and widows.
          </p>
        </div>
        <div className="flex space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl sm:text-3xl text-gray-300 hover:text-blue-800" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-2xl sm:text-3xl text-gray-300 hover:text-red-500" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="text-2xl sm:text-3xl text-gray-300 hover:text-blue-400" />
          </a>
        </div>
      </div>
      <div className="container mx-auto mt-4 border-t border-gray-500 pt-4">
        <p className="text-center text-gray-300 text-sm">
          © 2025 PMSS. All rights reserved. | Terms of Service | Privacy Policy
        </p>
      </div>
    </footer>
    </>
  )
}

export default Footer