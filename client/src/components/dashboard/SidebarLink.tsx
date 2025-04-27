export const SidebarLink = ({ title }: { title: string }) => {
    return (
      <a href="#" className="text-md font-medium text-gray-700 dark:text-white hover:text-[#5048E5] transition-colors">
        {title}
      </a>
    );
  };