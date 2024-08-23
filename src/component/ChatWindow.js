import React from 'react';

function ChatWindow() {
  const messages = [
    { user: "Doris Brown", time: "10:30", content: "Images", type: "image", status: "delivered" },
    { user: "Patricia Smith", time: "01:30", content: "admin_v1.0.zip", type: "file", size: "12.5 MB", status: "delivered" }
  ];

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-gray-800 font-bold">Doris Brown</h2>
        <span className="ml-2 text-green-500 text-sm">●</span>
      </div>
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="flex">
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3">
              {/* Use user image */}
            </div>
            <div className={`p-3 rounded-lg ${message.user === "Doris Brown" ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-700"}`}>
              {message.type === "image" ? (
                <div>
                  {/* Display images here */}
                </div>
              ) : message.type === "file" ? (
                <div className="flex items-center">
                  <span className="mr-2">{message.content}</span>
                  <span className="text-xs">{message.size}</span>
                </div>
              ) : (
                <p>{message.content}</p>
              )}
              <span className="text-xs text-gray-500 mt-1 block">{message.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatWindow;
