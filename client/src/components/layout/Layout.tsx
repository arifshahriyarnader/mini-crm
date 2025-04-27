import { ReactNode, useEffect, useState } from "react";
import { Header, Sidebar } from "../../components/index";
import { useNavigate } from "react-router";
import { appConfig } from "../../common/config";
import { authServices } from "../../auth";

interface LayoutProps  {
  title: string;
  children: ReactNode;
};

export const Layout = ({ title, children }: LayoutProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleLogout = () => {
    const user = localStorage.getItem(appConfig.CURRENT_USER_KEY);
    if (user) {
      authServices.logout();
      localStorage.removeItem(appConfig.CURRENT_USER_KEY);
      localStorage.removeItem("darkMode");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Sidebar darkMode={darkMode} />
      <div className="flex flex-col flex-1 text-gray-900 dark:text-gray-100">
        <Header
          title={title}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          showProfileMenu={showProfileMenu}
          toggleProfileMenu={toggleProfileMenu}
          handleLogout={handleLogout}
        />

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};


