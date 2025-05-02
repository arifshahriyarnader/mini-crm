import { Link } from "react-router";
import { sidebarLinks } from "../../constants";
import { SidebarLink } from "../dashboard/index";

interface SidebarProps {
  darkMode: boolean;
};

export const Sidebar = ({ darkMode }: SidebarProps) => {
  return (
    <div
      className={`w-64 p-6 shadow-md min-h-screen ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <nav className="flex flex-col gap-6">
        <Link to="/dashboard">
          <h2 className="text-2xl font-bold text-[#5048E5] mb-4">
            FreelancerCRM
          </h2>
        </Link>
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.title}
            title={link.title}
            className={`${
              darkMode
                ? "text-[#5048E5] hover:text-white"
                : "text-gray-900 hover:text-[#5048E5]"
            }`}
          />
        ))}
      </nav>
    </div>
  );
};
