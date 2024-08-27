import React, { useState, useEffect } from 'react';
import { FaCircle, FaImage, FaSearch, FaPhone, FaVideo, FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';
import io from 'socket.io-client';
import ChatWindow from './ChatWindow';

function ChatList() {
  const [users, setUsers] = useState([]);
  const [latestMessages, setLatestMessages] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    fetchUsers();
    fetchLatestMessages();

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (newMessage) => {
        setLatestMessages(prev => ({
          ...prev,
          [newMessage.senderId]: newMessage
        }));
      });
    }
    return () => {
      if (socket) {
        socket.off('receiveMessage');
      }
    };
  }, [socket]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchLatestMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/chats/latest-messages', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const messageMap = {};
      response.data.forEach(message => {
        messageMap[message.userId] = message;
      });
      setLatestMessages(messageMap);
    } catch (error) {
      console.error('Error fetching latest messages:', error);
    }
  };

  const handleUserClick = async (userId) => {
    const selectedUser = users.find(user => user._id === userId);
    setSelectedUser(selectedUser);
    if (socket) {
      socket.emit('joinChat', userId);
    }
  };

  const handleMessageUpdate = (userId, newMessage) => {
    setLatestMessages(prev => ({
      ...prev,
      [userId]: newMessage
    }));
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (latestMessages[user._id]?.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen">
      <div className="bg-[#f5f7fb] w-[400px] border-r p-4 pb-10 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages or users"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#e6ebf5] text-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* User avatars */}
        <div className="flex justify-around space-x-4 mb-6 px-4">
          {users.slice(0, 4).map((user) => (
            <div
              key={user._id}
              className="relative text-center p-2 rounded-md cursor-pointer"
              onClick={() => handleUserClick(user._id)}
            >
              <div
                className="absolute inset-0 bg-[#e6ebf5] rounded-md"
                style={{ height: "50%", bottom: 0, top: "40%" }}
              />
              <div className="relative z-10">
                <div className="relative inline-block">
                  <img
                    src={user.img || 'https://via.placeholder.com/50'}
                    alt={user.username}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-white flex items-center justify-center border border-white">
                    <FaCircle
                      className={`text-${user.isOnline ? "green" : "gray"}-500 text-[8px]`}
                    />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700 -mt-2 pb-2">
                  {user.username.split(' ')[0]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-gray-500 text-sm font-medium mb-2">All Users</h3>
          <ul>
            {filteredUsers.map((user) => {
              const lastMessage = latestMessages[user._id];
              return (
                <li
                  key={user._id}
                  className="flex items-center py-4 hover:bg-gray-200 rounded-lg px-2 pr-4 cursor-pointer"
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className="relative mr-3">
                    <img
                      src={user.img || 'https://via.placeholder.com/50'}
                      alt={user.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-white flex items-center justify-center">
                      <FaCircle
                        className={`text-${user.isOnline ? "green" : "gray"}-500 text-xs`}
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-gray-800 font-medium">{user.username}</h4>
                    <p className="text-gray-500 text-sm">
                      {lastMessage ? (
                        lastMessage.type === 'image' ? (
                          <><FaImage className="inline mr-1" /> Image</>
                        ) : (
                          lastMessage.content
                        )
                      ) : "No messages yet"}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 text-xs">
                      {lastMessage && lastMessage.createdAt && 
                        new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedUser ? (
          <ChatWindow 
            selectedUser={selectedUser}
            socket={socket}
            onMessageUpdate={handleMessageUpdate}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatList;