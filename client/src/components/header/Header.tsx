import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";

interface HeaderProps {
  title: string;
  darkMode: boolean;
  toggleTheme: () => void;
  showProfileMenu: boolean;
  toggleProfileMenu: () => void;
  handleLogout: () => void;
};

export const Header = ({
  title,
  darkMode,
  toggleTheme,
  showProfileMenu,
  toggleProfileMenu,
  handleLogout,
}: HeaderProps) => {
  return (
    <header className={`flex justify-between items-center px-6 py-4 shadow-md ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <h1 className="text-2xl font-semibold">
        {title}
      </h1>

      <div className="flex items-center gap-4 relative">
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
        >
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>

        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          >
            <FaUserCircle size={24} />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-100 dark:bg-gray-700 rounded-md shadow-md p-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
