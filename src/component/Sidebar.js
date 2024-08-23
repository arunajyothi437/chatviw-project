import React, { useState } from 'react';
import logo_project from "../assets/images/logo_project.png";
import profile from "../assets/images/user.png";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { RiGroupLine } from "react-icons/ri";
import { RiContactsLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { GoGlobe } from "react-icons/go";
import { MdOutlineDarkMode } from "react-icons/md";

function Sidebar({ setActiveScreen }) {
  const [activeIcon, setActiveIcon] = useState(0);

  const icons = [
    { type: 'image', src: logo_project, alt: 'Chat List' },
    { type: 'icon', component: <IoPersonOutline />, alt: 'Friends' },
    { type: 'icon', component: <HiOutlineChatBubbleOvalLeftEllipsis />, alt: 'charts' },
    { type: 'icon', component: <RiGroupLine />, alt: 'groups' },
    { type: 'icon', component: <RiContactsLine />, alt: 'contacts' },
    { type: 'icon', component: <IoSettingsOutline />, alt: 'settings' },
    { type: 'icon', component: <GoGlobe />, alt: 'globe' },
    { type: 'icon', component: <MdOutlineDarkMode />, alt: 'moon' },
    { type: 'image', src: profile, alt: 'profile' },
  ];

  const handleIconClick = (index) => {
    setActiveIcon(index);
    setActiveScreen(index);
  };

  return (
    <div className="w-[75px] bg-white flex flex-col items-center py-4">
      {icons.map((icon, index) => (
        <button
          key={index}
          className={`mb-4 p-[14px] rounded-md ${activeIcon === index ? 'bg-blue-50' : 'hover:bg-gray-200'}`}
          onClick={() => handleIconClick(index)}
        >
          {icon.type === 'image' ? (
            <img src={icon.src} alt={icon.alt} className="w-8 h-8" />
          ) : (
            <div className={`text-2xl ${activeIcon === index ? 'text-blue-500' : 'text-gray-500'}`}>
              {icon.component}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
