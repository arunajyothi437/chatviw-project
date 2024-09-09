import React, { useState, useEffect } from "react";
import logo_project from "../assets/images/logo_project.png";
import profile from "../assets/images/user.png";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { RiGroupLine, RiContactsLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { GoGlobe } from "react-icons/go";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

// Custom hook for managing theme
const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return [isDark, toggleTheme];
};

const Tooltip = ({ text }) => (
  <div className="absolute bottom-[110%] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2">
    {text}
  </div>
);

function Sidebar({ setActiveScreen }) {
  const [activeIcon, setActiveIcon] = useState(2);
  const [isDark, toggleTheme] = useTheme();
  const [tooltipText, setTooltipText] = useState("");
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const icons = [
    { type: "image", src: logo_project, alt: "Logo" },
    { type: "icon", component: <IoPersonOutline />, alt: "Profile" },
    { type: "icon", component: <HiOutlineChatBubbleOvalLeftEllipsis />, alt: "Chats" },
    { type: "icon", component: <RiGroupLine />, alt: "Groups" },
    { type: "icon", component: <RiContactsLine />, alt: "Contacts" },
    { type: "icon", component: <IoSettingsOutline />, alt: "Settings" },
    { type: "icon", component: <GoGlobe />, alt: "Language" },
    { type: "icon", component: isDark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />, alt: "Dark Mode" },
    { type: "image", src: profile, alt: "User Profile" },
  ];

  const handleIconClick = (index) => {
    setActiveIcon(index);
    setActiveScreen(index);
    if (index === 7) {
      toggleTheme();
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIcon(index);
    setTooltipText(icons[index].alt);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
    setTooltipText("");
  };

  return (
    <div className="w-[70px] bg-white dark:bg-gray-800 flex flex-col items-start py-4 h-screen mx-1 relative">
      <div className="mb-6 pl-4">
        <img src={logo_project} alt="Logo" className="w-8 h-8" />
      </div>
      <div className="flex flex-col space-y-6 flex-grow w-full">
        <div className="space-y-4 mt-10">
          {[1, 2, 3, 4].map((index) => (
            <button
              key={index}
              className={`relative p-3 w-full text-left rounded-lg ${
                activeIcon === index ? "bg-[#f7f7ff] dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleIconClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`text-2xl ${
                  activeIcon === index ? "text-[#9b96f4]" : "text-gray-500 dark:text-gray-400"
                } pl-2`}
              >
                {icons[index].component}
              </div>
              {hoveredIcon === index && <Tooltip text={tooltipText} />}
            </button>
          ))}
        </div>
        <div className="space-y-4 mt-16">
          {[5, 6, 7].map((index) => (
            <button
              key={index}
              className={`relative p-3 w-full text-left ${
                activeIcon === index ? "bg-[#f7f7ff] dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
              } rounded-lg`}
              onClick={() => handleIconClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`text-2xl ${
                  activeIcon === index ? "text-[#9b96f4]" : "text-gray-500 dark:text-gray-400"
                } pl-2 `}
              >
                {icons[index].component}
              </div>
              {hoveredIcon === index && <Tooltip text={tooltipText} />}
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