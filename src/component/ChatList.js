import React, { useState, useEffect } from 'react';
import { FaCircle, FaImage, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import io from 'socket.io-client';
import ChatWindow from './ChatWindow';

function ChatList() {
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

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

    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchUsers();
    fetchChats();

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (newMessage) => {
        setChats(prevChats => 
          prevChats.map(chat => 
            chat._id === newMessage.chatId 
              ? { ...chat, messages: [...chat.messages, newMessage] }
              : chat
          )
        );
      });
    }
  }, [socket]);

  const handleUserClick = async (userId) => {
    const selectedUser = users.find(user => user._id === userId);
    setSelectedUser(selectedUser);
    if (socket) {
      socket.emit('joinChat', userId);
    }
  };

  const handleMessageUpdate = (userId, newMessage, deletedMessageId) => {
    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.users.some(user => user._id === userId)) {
          if (deletedMessageId) {
            return {
              ...chat,
              messages: chat.messages.filter(msg => msg._id !== deletedMessageId)
            };
          } else if (newMessage) {
            return {
              ...chat,
              messages: [...chat.messages, newMessage]
            };
          }
        }
        return chat;
      })
    );
  };

  return (
    <div className="flex">
      <div className="bg-[#f5f7fb] w-[400px] h-screen border-r p-4 pb-10">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages or users"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#e6ebf5] text-gray-600"
            />
          </div>
        </div>

        {/* User Profiles */}
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
                    alt={user.username || user.email}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-white flex items-center justify-center border border-white">
                    <FaCircle
                      className={`text-${user.isOnline ? "green" : "gray"}-500 text-[8px]`}
                    />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700 -mt-2 pb-2">
                  {user.username || user.email.split('@')[0]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{ maxHeight: "calc(100vh - 220px)" }}
          className="flex flex-col gap-2 scrollable"
        >
          <h3 className="text-gray-500 text-sm font-medium mb-2">Recent</h3>
          <ul className="overflow-y-auto pb-5">
            {chats.map((chat) => {
              const otherUser = chat.users.find(user => user._id !== JSON.parse(sessionStorage.getItem("user"))._id);
              const lastMessage = chat.messages[chat.messages.length - 1];
              return (
                <li
                  key={chat._id}
                  className="flex items-center py-4 hover:bg-gray-200 rounded-lg px-2 pr-4 cursor-pointer"
                  onClick={() => handleUserClick(otherUser._id)}
                >
                  <div className="relative mr-3">
                    <img
                      src={otherUser.img || 'https://via.placeholder.com/50'}
                      alt={otherUser.username || 'User'}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-white flex items-center justify-center">
                      <FaCircle
                        className={`text-${otherUser.isOnline ? "green" : "gray"}-500 text-xs`}
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-gray-800 font-medium">{otherUser.username || otherUser.email.split('@')[0]}</h4>
                    <p className="text-gray-500 text-sm flex items-center">
                      {lastMessage && lastMessage.type === 'image' && (
                        <FaImage className="mr-1" />
                      )}
                      {lastMessage ? (
                        lastMessage.type === 'text' ? lastMessage.content : 'Sent an image'
                      ) : "No messages yet"}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 text-xs">
                      {lastMessage && new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {chat.unreadCount > 0 && (
                      <span className="inline-block mt-1 text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 w-full">
        {selectedUser ? (
          <ChatWindow 
            selectedUser={selectedUser}
            socket={socket}
            onMessageUpdate={handleMessageUpdate}
          />
        ) : (
          <div className="p-6 text-gray-500">Select a user to start chatting.</div>
        )}
      </div>
    </div>
  );
}

export default ChatList;