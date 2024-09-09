import React, { useEffect, useState } from "react";
import Sidebar from "./component/Sidebar";
import ChatWindow from "./component/ChatWindow";
import MessageInput from "./component/MessageInput";
import ChatList from "./component/ChatList";
import UserProfile from "./component/UserProfile";
import GroupsList from "./component/GroupsList";
import ContactsList from "./component/ContactsList";

function App() {
  const [activeScreen, setActiveScreen] = useState(0);
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

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
        case 5:
          return <UserProfile />;
      default:
        return <ChatList />;
    }
  };

  return (
    <div className="flex overflow-hidden">
      <Sidebar setActiveScreen={setActiveScreen} />
      <div className=" flex flex-col w-full">{renderActiveScreen()}

      </div>
    </div>
  );
}

export default App;
