import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authServices } from "../auth";

interface SecureRouteProps {
  children: ReactNode;
}

export default function SecureRoute({ children }: SecureRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authServices.isUserLoggedIn()) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: "45%" }}
        ></div>
      </div>
    );
  }

  return children;
}
