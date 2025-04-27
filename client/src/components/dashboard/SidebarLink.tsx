type SidebarLinkProps = {
  title: string;
  className?: string; 
};

export const SidebarLink = ({title,className}: SidebarLinkProps) => {
    return (
      <a href="#" className={`cursor-pointer ${className}`} >
        {title}
      </a>
    );
  };