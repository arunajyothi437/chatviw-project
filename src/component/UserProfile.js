import React, { useState } from 'react';
import { FaUser, FaPaperclip, FaChevronDown, FaChevronUp, FaEllipsisV } from 'react-icons/fa';

function UserProfile() {
  const user = {
    name: "Patricia Smith",
    email: "adc@123.com",
    time: "11:40 AM",
    location: "California, USA",
    img: "https://picsum.photos/150/150",
    status: "Active",
  };

  // State to handle toggling of sections
  const [showAbout, setShowAbout] = useState(false);
  const [showFiles, setShowFiles] = useState(false);

  return (
    <div className="bg-gray-100 w-[400px] p-6">
      {/* My Profile and Options */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">My Profile</h1>
        <FaEllipsisV className="text-gray-600 cursor-pointer" />
      </div>

      {/* Profile Header */}
      <div className="text-center mt-4">
        <div className="relative inline-block">
          <img
            src={user.img}
            alt={user.name}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {user.name}
        </h2>
        <p className="text-green-500 text-sm">{user.status}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mt-6"></div>

      {/* Profile Description */}
      <p className="mt-6 text-center text-gray-600 px-4">
        If several languages coalesce, the grammar of the resulting language is
        more simple and regular than that of the individual.
      </p>

      {/* About Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowAbout(!showAbout)}
        >
          <div className="flex items-center">
            <FaUser className="text-gray-600 mr-2" />
            <h3 className="text-gray-700 font-semibold">About</h3>
          </div>
          {showAbout ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
        </div>
        {showAbout && (
          <div className="mt-4 text-gray-600">
            <p className="mb-2">
              <span className="font-semibold">Name: </span>{user.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email: </span>{user.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Time: </span>{user.time}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Location: </span>{user.location}
            </p>
          </div>
        )}
      </div>

      {/* Attached Files Section */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowFiles(!showFiles)}
        >
          <div className="flex items-center">
            <FaPaperclip className="text-gray-600 mr-2" />
            <h3 className="text-gray-700 font-semibold">Attached Files</h3>
          </div>
          {showFiles ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
        </div>
        {showFiles && (
          <div className="mt-4 text-gray-600">
            {/* Example of attached files (you can replace with actual data) */}
            <p>No files attached</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
