import React, { useEffect, useState } from 'react';
import { FaSearch, FaUserPlus, FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    (contact.username || contact.email).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedContacts = filteredContacts.reduce((groups, contact) => {
    const firstLetter = (contact.username || contact.email)[0].toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(contact);
    return groups;
  }, {});

  const sortedLetters = Object.keys(groupedContacts).sort();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-[400px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Contacts</h2>
        <div className="flex space-x-2">
          <FaUserPlus className="text-gray-600 dark:text-gray-400 cursor-pointer" />
          <FaEllipsisV className="text-gray-600 dark:text-gray-400 cursor-pointer" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600" />
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {sortedLetters.length > 0 ? (
          sortedLetters.map((letter) => (
            <div key={letter}>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{letter}</h3>
              <ul className="space-y-2">
                {groupedContacts[letter].map((contact) => (
                  <li key={contact.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white font-semibold">
                      {(contact.username || contact.email)[0].toUpperCase()}
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">{contact.username || contact.email}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No contacts found</p>
        )}
      </div>
    </div>
  );
}

export default ContactsList;