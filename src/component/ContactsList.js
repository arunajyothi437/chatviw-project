import React from 'react';
import { FaSearch, FaUserPlus, FaEllipsisV } from 'react-icons/fa';

function ContactsList() {
  const contacts = [
    { letter: "A", names: ["Albert Rodarte", "Allison Etter"] },
    { letter: "C", names: ["Craig Smiley"] },
    { letter: "D", names: ["Daniel Clay", "Doris Brown"] },
    { letter: "I", names: ["Ian Duncan"] },
    // Add more dummy data up to "Z"
    { letter: "Z", names: ["Zack Snyder"] },
  ];

  return (
    <div className="bg-gray-100 w-[400px] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Contacts</h1>
        <FaUserPlus className="text-gray-600 cursor-pointer" />
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search users.."
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600"
        />
        <FaSearch className="absolute top-3 right-3 text-gray-500" />
      </div>

      {/* Contacts List */}
      <ul>
        {contacts.map((group, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-purple-500 text-sm font-semibold">{group.letter}</h2>
            {group.names.map((name, idx) => (
              <li key={idx} className="flex justify-between items-center py-2">
                <h4 className="text-gray-700 font-medium">{name}</h4>
                <FaEllipsisV className="text-gray-600 cursor-pointer" />
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ContactsList;
