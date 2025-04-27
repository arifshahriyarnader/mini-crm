import { Link } from "react-router";

type SidebarLinkProps = {
  title: string;
  className?: string;
};

export const SidebarLink = ({ title, className }: SidebarLinkProps) => {
  return (
    <Link to={`/${title.toLowerCase()}`} className={`cursor-pointer ${className}`}>
      {title}
    </Link>
  );
};
