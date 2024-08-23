import React from 'react';
import { FaPaperPlane, FaSmile, FaPaperclip } from 'react-icons/fa';

function MessageInput() {
  return (
    <div className="border-t bg-white p-4 flex items-center">
      <input
        type="text"
        placeholder="Enter Message..."
        className="flex-1 px-4 py-2 border rounded-lg bg-gray-50 text-gray-600 mr-4"
      />
      <FaSmile className="text-gray-400 text-2xl mr-4" />
      <FaPaperclip className="text-gray-400 text-2xl mr-4" />
      <button className="bg-indigo-500 p-3 rounded-full text-white">
        <FaPaperPlane className="text-white" />
      </button>
    </div>
  );
}

export default MessageInput;
