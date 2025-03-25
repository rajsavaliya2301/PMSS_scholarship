import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const siteMapData = [
  { title: "Home", path: "/" },
  {
    title: "Student Portal",
    children: [
      {
        title: "Dashboard",
        children: [
          { title: "Profile", path: "/student/profile" },
          { title: "Apply Scholarship", path: "/student/apply" },
          { title: "Edit Profile", path: "/student/edit" },
          { title: "Documents", path: "/student/documents" },
          { title: "Records", path: "/student/records" }
        ]
      }
    ]
  },
  {
    title: "Institute Portal",
    children: [
      {
        title: "Dashboard",
        children: [
          { title: "Student Profile", path: "/institudeportal/studentprofile" }
        ]
      }
    ]
  },
  { title: "Officer Portal", path: "/officer" },
  { title: "Login / Signup", path: "/signinup" },
  { title: "Sitemap", path: "/site-map" }
];

const TreeNode = ({ node, level = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const prefix = "    ".repeat(level) + (node.children ? (expanded ? "└─▼ " : "└─▶ ") : "└── ");

  return (
    <div className="ml-4 font-mono text-gray-700">
      <div
        className="cursor-pointer hover:text-blue-600"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="mr-1">{prefix}</span>
        {node.path ? (
          <Link to={node.path} className="text-blue-600 hover:underline">
            {node.title}
          </Link>
        ) : (
          <span className="font-semibold">{node.title}</span>
        )}
      </div>
      {expanded && node.children && (
        <div className="ml-6 border-l-2 border-gray-400 pl-2">
          {node.children.map((child, idx) => (
            <TreeNode key={idx} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sitemap = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">
            📜 PMSS Sitemap
          </h1>
          <div className=" text-gray-400 p-10 rounded-md shadow-lg font-mono">
            <p> Site-Map</p>
            <p> </p>
            {siteMapData.map((section, index) => (
              <TreeNode key={index} node={section} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sitemap;
