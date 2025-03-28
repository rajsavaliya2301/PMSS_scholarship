import React from "react";
import Header from "./Header";
import Footer from "./Footer";


const announcements = [
  {
    id: 1,
    title: "System Maintenance Scheduled",
    date: "March 25, 2025",
    content:
      "The Payment Management System will undergo maintenance on March 30, 2025, from 1:00 AM to 5:00 AM IST. During this period, the system may be unavailable. We apologize for any inconvenience caused.",
  },
  {
    id: 2,
    title: "New Feature Release: Enhanced Reporting",
    date: "March 20, 2025",
    content:
      "We are excited to announce the release of our enhanced reporting module, providing users with more detailed insights and customizable report options.",
  },
  {
    id: 3,
    title: "Security Update Notification",
    date: "March 18, 2025",
    content:
      "A new security patch has been applied to ensure better protection of user data. Please log out and log in again for the update to take effect.",
  },
];

const Announcements = () => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-gray-900 border-b pb-3 mb-6 text-center">
          Latest Announcements
        </h1>
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-5 border rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-gray-50"
            >
              <h2 className="text-2xl font-semibold text-blue-700">
                {announcement.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{announcement.date}</p>
              <p className="text-gray-700">{announcement.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Announcements;