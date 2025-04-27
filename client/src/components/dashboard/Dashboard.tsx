import { useState } from "react";
import { useNavigate } from "react-router";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { sidebarLinks, summaryData } from "../../constants";
import { SidebarLink } from "./SidebarLink";
import { SummaryCard } from "./SummaryCard";
import { appConfig } from "../../common/config";
import { authServices } from "../../auth";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    const user = localStorage.getItem(appConfig.CURRENT_USER_KEY);
    if (user) {
      authServices.logout();
      localStorage.removeItem(appConfig.CURRENT_USER_KEY);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="w-64 bg-white dark:bg-gray-800 p-6 shadow-md">
        <nav className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-[#5048E5] mb-4">
            FreelancerCRM
          </h2>

          {sidebarLinks.map((link) => (
            <SidebarLink key={link.title} title={link.title} />
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium">Dashboard</span>
          </div>

          <div className="flex items-center gap-4 relative">
            <button
              onClick={toggleTheme}
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
            >
              {darkMode ? <FaMoon /> : <FaSun />}
            </button>

            <div>
              <button
                onClick={toggleProfileMenu}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
              >
                <FaUserCircle size={24} />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-md p-2">
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer ${
                        darkMode ? "text-[#1A0817]" : "text-black"
                      }`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {summaryData.map((item) => (
              <SummaryCard
                key={item.title}
                title={item.title}
                value={item.value}
                buttonText={item.buttonText}
              />
            ))}
          </div>

          <section>
            <h2 className="text-xl font-bold mb-4">Upcoming Reminders</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <p>No upcoming reminders.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
