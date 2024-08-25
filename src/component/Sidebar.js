import React, { useState } from "react";
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
  const [activeIcon, setActiveIcon] = useState(2);

  const icons = [
    { type: "image", src: logo_project, alt: "Logo" },
    { type: "icon", component: <IoPersonOutline />, alt: "Profile" },
    {
      type: "icon",
      component: <HiOutlineChatBubbleOvalLeftEllipsis />,
      alt: "Chats",
    },
    { type: "icon", component: <RiGroupLine />, alt: "Groups" },
    { type: "icon", component: <RiContactsLine />, alt: "Contacts" },
    { type: "icon", component: <IoSettingsOutline />, alt: "Settings" },
    { type: "icon", component: <GoGlobe />, alt: "Language" },
    { type: "icon", component: <MdOutlineDarkMode />, alt: "Dark Mode" },
    { type: "image", src: profile, alt: "User Profile" },
  ];

  const handleIconClick = (index) => {
    setActiveIcon(index);
    setActiveScreen(index);
  };

  return (
    <div className="w-[70px] bg-white flex flex-col items-start py-4 h-screen mx-1">
      <div className="mb-6 pl-4">
        <img src={logo_project} alt="Logo" className="w-8 h-8" />
      </div>

      <div className="flex flex-col space-y-6 flex-grow w-full">
        <div className="space-y-4 mt-10">
          {[1, 2, 3, 4].map((index) => (
            <button
              key={index}
              className={`p-3 w-full text-left rounded-lg ${
                activeIcon === index ? "bg-[#f7f7ff]" : "hover:bg-gray-100"
              }`}
              onClick={() => handleIconClick(index)}
            >
              <div
                className={`text-2xl ${
                  activeIcon === index ? "text-[#9b96f4]" : "text-gray-500"
                } pl-2`}
              >
                {icons[index].component}
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-4 mt-16">
          {[5, 6, 7].map((index) => (
            <button
              key={index}
              className={`p-3 w-full text-left ${
                activeIcon === index ? "bg-[#f7f7ff]" : "hover:bg-gray-100"
              } rounded-lg`}
              onClick={() => handleIconClick(index)}
            >
              <div
                className={`text-2xl ${
                  activeIcon === index ? "text-[#9b96f4]" : "text-gray-500"
                } pl-2 `}
              >
                {icons[index].component}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pl-4 mb-4">
        <img
          src={profile}
          alt="User Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
}

export default Sidebar;
