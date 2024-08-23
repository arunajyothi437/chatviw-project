import React from 'react';
import { FaCircle, FaSearch } from 'react-icons/fa';

function ChatList() {
  const chats = [
    { name: "Patrick Hendricks", message: "hey! there I’m available", time: "02:50 PM", img: "https://picsum.photos/50/50?random=1", online: true },
    { name: "Mark Messer", message: "Images", time: "10:30 AM", img: "https://picsum.photos/50/50?random=2", unread: 2, online: false },
    { name: "General", message: "This theme is Awesome!", time: "2:06 min", img: "https://picsum.photos/50/50?random=3", online: false },
    { name: "Doris Brown", message: "typing...", time: "10:05 PM", img: "https://picsum.photos/50/50?random=4", online: true },
    { name: "Designer", message: "Next meeting tomorrow 10:00 AM", time: "2:10 min", img: "https://picsum.photos/50/50?random=5", unread: 1, online: false },
  ];

  return (
    <div className="bg-violet-50 w-[400px] border-r p-6">
        <h2 className='text-gray-600 font-semibold font-sans text-xl mb-6'>Chats</h2>
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages or users"
            className="w-full pl-10 pr-4 py-[10px] border rounded-lg bg-gray-50 text-gray-600"
          />
        </div>
      </div>

      {/* User Profiles */}
      <div className="px-4 flex overflow-x-auto space-x-4">
        {chats.slice(0, 4).map((chat, index) => (
          <div key={index} className="relative flex-shrink-0 w-16 h-16 text-center">
            <img src={chat.img} alt={chat.name} className="w-10 h-10 object-cover rounded-full" />
            <div className="relative bottom-0 left-10 w-1 h-1 rounded-full bg-white">
              <FaCircle className={`text-${chat.online ? 'green' : 'gray'}-500`} />
            </div>
            <div>
            <p className="text-xs mt-2 text-gray-700">{chat.name.split(" ")[0]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Chats Title */}
      <div className="mt-4 px-4">
        <h3 className="text-gray-500 text-sm mb-2">Recent</h3>

        {/* Recent Chats List */}
        <ul>
          {chats.map((chat, index) => (
            <li key={index} className="flex justify-between items-center py-2">
              <div className="flex items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img src={chat.img} alt={chat.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-white">
                    <FaCircle className={`text-${chat.online ? 'green' : 'gray'}-500`} />
                  </div>
                </div>
                <div>
                  <h4 className="text-gray-700 font-semibold">{chat.name}</h4>
                  <p className="text-gray-500 text-sm">{chat.message}</p>
                </div>
              </div>
              <div className="flex flex-col items-end text-gray-500 text-xs">
                <div>{chat.time}</div>
                {chat.unread && (
                  <span className="mt-1 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatList;
