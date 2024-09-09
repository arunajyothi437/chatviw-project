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
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-[400px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Groups</h2>
        <FaUserFriends className="text-gray-600 dark:text-gray-400" />
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600" />
        <input
          type="text"
          placeholder="Search groups..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Groups List */}
      <ul className="space-y-2">
        {groups.map((group, index) => (
          <li key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white font-semibold">
                {group.icon}
              </div>
              <span className="text-gray-800 dark:text-gray-200">{group.name}</span>
            </div>
            {group.badge && (
              <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
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