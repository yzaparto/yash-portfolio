
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const links = [
    { path: "/", label: "about" },
    { path: "/notes", label: "notes" },
  ];

  return (
    <nav className={`${isMobile ? 'fixed top-0 left-0 w-full bg-white border-b border-gray-100 p-4' : 'fixed left-0 top-0 h-screen w-48 p-12'}`}>
      <div className={`${isMobile ? 'flex justify-center space-x-8' : 'space-y-4'}`}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block transition-all duration-200 ${
              location.pathname === link.path
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
