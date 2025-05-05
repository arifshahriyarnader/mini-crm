import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import { getAllReminder } from "../../api/services";

interface HeaderProps {
  title: string;
  darkMode: boolean;
  toggleTheme: () => void;
  showProfileMenu: boolean;
  toggleProfileMenu: () => void;
  handleLogout: () => void;
  userName: string;
  //userEmail?: string;
  userAvatar?: string;
}

export const Header = ({
  title,
  darkMode,
  toggleTheme,
  showProfileMenu,
  toggleProfileMenu,
  handleLogout,
  userName,
  //userEmail,
  userAvatar,
}: HeaderProps) => {
  const [reminderCount, setReminderCount] =useState(0)
  const userInitial = userName?.charAt(0).toUpperCase() || "U";

  useEffect(() =>{
    const fetchReminder=async() =>{
      try{
        const reminder=await getAllReminder()
        setReminderCount(reminder.length)
      }
      catch(error){
        console.error("Failed to load reminders", error);
      }
    }
    fetchReminder()
  }, [])
  return (
    <header
      className={`flex justify-between items-center px-6 py-4 shadow-md ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="flex items-center gap-4 relative">
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-200 dark:bg-gray-700 cursor-pointer rounded-full hover:opacity-80 transition-opacity"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <FaMoon className="text-gray-800" />
          ) : (
            <FaSun className="text-gray-600" />
          )}

        </button>
          <button className="cursor-pointer relative">
          <IoIosNotifications size={24} />
          {reminderCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
            {reminderCount}
          </span>
        )}
          </button>

        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className={`flex cursor-pointer items-center justify-center w-10 h-10 rounded-full ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
            aria-label="User profile menu"
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span
                className={`font-semibold ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {userInitial}
              </span>
            )}
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {userName}
                </p>
                {/* {userEmail && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                    {userEmail}
                  </p>
                )} */}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 cursor-pointer text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiLogOut className="mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
