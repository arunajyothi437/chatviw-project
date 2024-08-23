import React from 'react';
import { FaSearch, FaUserFriends } from 'react-icons/fa';

function GroupsList() {
  const groups = [
    { name: "#General", icon: "G" },
    { name: "#Reporting", icon: "R", badge: "23+" },
    { name: "#Designer", icon: "D", badge: "New" },
    { name: "#Developers", icon: "D" },
    { name: "#Project-alpha", icon: "P", badge: "New" },
    { name: "#Snacks", icon: "S" },
  ];

  return (
    <div className="bg-gray-100 w-[400px] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Groups</h1>
        <FaUserFriends className="text-gray-600 cursor-pointer" />
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search groups..."
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600"
        />
        <FaSearch className="absolute top-3 right-3 text-gray-500" />
      </div>

      {/* Groups List */}
      <ul>
        {groups.map((group, index) => (
          <li key={index} className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full mr-3 text-purple-500 font-semibold">
                {group.icon}
              </div>
              <h4 className="text-gray-700 font-semibold">{group.name}</h4>
            </div>
            {group.badge && (
              <span className={`ml-2 text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full ${group.badge === "New" ? 'bg-red-200' : 'bg-red-500 text-white'}`}>
                {group.badge}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupsList;
