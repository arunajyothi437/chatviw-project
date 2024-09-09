import React, { useState, useEffect, useRef } from 'react';
import { FaPaperclip, FaSmile, FaImage, FaPaperPlane } from 'react-icons/fa';
import { FaSearch, FaPhone, FaVideo, FaEllipsisV } from 'react-icons/fa';
import { BsCheckAll } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import
{ Modal }
from
"antd"
;

const ChatWindow = ({ selectedUser, socket, onMessageUpdate }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const loggedInUserId = JSON.parse(sessionStorage.getItem("user"))._id;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const userDetails = JSON.parse(sessionStorage.getItem("user"));
        const sender = userDetails._id;
        const receiver = selectedUser._id;
        const response = await axios.get(`http://localhost:5000/api/chats/messages?sender=${sender}&receiver=${receiver}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.data.status && response.data.data) {
          setMessages(response.data.data.messages);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
      }
    };

    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (newMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
        onMessageUpdate(newMessage.sender, newMessage);
      });
    }
    return () => {
      if (socket) {
        socket.off('receiveMessage');
      }
    };
  }, [socket, onMessageUpdate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleSend = async () => {
    if (message.trim()) {
      const newMessage = {
        sender: loggedInUserId,
        receiver: selectedUser._id,
        content: message,
        type: 'outgoing',
        createdAt: new Date().toISOString()
      };
      // Immediately add the message to state
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');

      try {
        const response = await axios.post('http://localhost:5000/api/chats/message', {
          sender: loggedInUserId,
          receiver: selectedUser._id,
          messages: { content: newMessage.content, type: 'outgoing' }
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const serverMessage = response.data.message;
        if (socket) {
          socket.emit('sendMessage', serverMessage);
        }
        // Update the latest message in the ChatList
        onMessageUpdate(selectedUser._id, serverMessage);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('recipientId', selectedUser._id);

    try {
      const response = await axios.post('http://localhost:5000/api/chats/message', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const newMessage = response.data;
      setMessages(prevMessages => [...prevMessages, newMessage]);
      if (socket) {
        socket.emit('sendMessage', newMessage);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 shadow flex items-center justify-between p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center">
          <img
            src={selectedUser.img || "https://picsum.photos/50"}
            alt={selectedUser.username}
            className="rounded-full w-10 h-10"
          />
          <div className="ml-3">
            <h2 className="text-lg font-semibold dark:text-white">{selectedUser.username}</h2>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaSearch className="text-gray-600 dark:text-gray-400 cursor-pointer" />
          <FaPhone className="text-gray-600 dark:text-gray-400 cursor-pointer" />
          <FaVideo className="text-gray-600 dark:text-gray-400 cursor-pointer" />
          <FaEllipsisV className="text-gray-600 dark:text-gray-400 cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 dark:bg-gray-800">
        {messages.map((msg, index) => {
          const isOutgoing = msg.sender === loggedInUserId;
          return (
            <div key={index} className={`flex items-end ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
              {!isOutgoing && (
                <img
                  src={selectedUser.img || "https://picsum.photos/50"}
                  alt={selectedUser.username}
                  className="rounded-full w-10 h-10"
                />
              )}
              <div className={`${isOutgoing ? 'mr-2' : 'ml-2'}`}>
                <div className={`${
                  isOutgoing 
                    ? 'bg-blue-500 text-white dark:bg-blue-600' 
                    : 'bg-white text-gray-800 dark:bg-gray-700 dark:text-white'
                } p-3 rounded-lg ${isOutgoing ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                  {msg.content}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-end">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {isOutgoing && <BsCheckAll className="ml-1 text-blue-500" />}
                </span>
              </div>
              {isOutgoing && (
                <img
                  src="https://picsum.photos/50"
                  alt="You"
                  className="rounded-full w-10 h-10"
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 flex items-center p-3 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="relative">
          <FaSmile
            className="text-gray-600 dark:text-gray-400 cursor-pointer"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && (
            <div className="absolute bottom-12">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload">
          <FaPaperclip className="text-gray-600 dark:text-gray-400 cursor-pointer ml-4" />
        </label>

        <input
          type="file"
          accept="image/*"
          id="image-upload"
          className="hidden"
          onChange={handleFileUpload}
        />
        <label htmlFor="image-upload">
          <FaImage className="text-gray-600 dark:text-gray-400 cursor-pointer ml-4" />
        </label>

        <input
          type="text"
          placeholder="Enter Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 mx-4 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-full focus:outline-none"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />

        <FaPaperPlane
          className="text-gray-600 dark:text-gray-400 cursor-pointer"
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default ChatWindow;