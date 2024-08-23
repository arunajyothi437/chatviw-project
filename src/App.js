import React, { useState } from 'react';
import Sidebar from './component/Sidebar';
import ChatWindow from './component/ChatWindow';
import MessageInput from './component/MessageInput';
import ChatList from './component/ChatList';
import UserProfile from './component/UserProfile';
import GroupsList from './component/GroupsList';
import ContactsList from './component/ContactsList';

function App() {
  const [activeScreen, setActiveScreen] = useState(0);

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 0:
        return <ChatList />;
      case 1:
        return <UserProfile />;
        case 2:
          return <ChatList />;
      case 3:
        return <GroupsList />;
      case 4:
        return <ContactsList />;
      default:
        return <ChatList />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActiveScreen={setActiveScreen} />
      <div className="flex-1 flex flex-col">
        {renderActiveScreen()}
      </div>
      <div className="flex-1 flex flex-col">
          <ChatWindow />
          <MessageInput />
        </div>
    </div>
  );
}

export default App;