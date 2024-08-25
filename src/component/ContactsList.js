import React, { useEffect, useState } from 'react';
import { FaSearch, FaUserPlus, FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch contacts from the backend
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users'); // Replace with your API endpoint
        setContacts(response.data);
        console.log(response.data); // Check the format of your data
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter((contact) =>
    (contact.username || contact.email).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group contacts by the first letter of their username or email
  const groupedContacts = filteredContacts.reduce((groups, contact) => {
    const firstLetter = (contact.username || contact.email)[0].toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(contact);
    return groups;
  }, {});

  // Get the letters in sorted order
  const sortedLetters = Object.keys(groupedContacts).sort();

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute top-3 right-3 text-gray-500" />
      </div>

      {/* Contacts List */}
      <ul>
        {sortedLetters.length > 0 ? (
          sortedLetters.map((letter) => (
            <div key={letter} className="mb-4">
              <h2 className="text-purple-500 text-sm font-semibold">{letter}</h2>
              {groupedContacts[letter].map((contact) => (
                <li key={contact._id} className="flex justify-between items-center py-2">
                  <h4 className="text-gray-700 font-medium">
                    {contact.username || contact.email}
                  </h4>
                  <FaEllipsisV className="text-gray-600 cursor-pointer" />
                </li>
              ))}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No contacts found</p>
        )}
      </ul>
    </div>
  );
}

export default ContactsList;
