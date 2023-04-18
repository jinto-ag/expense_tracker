import React, { ReactNode, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  // Add any additional props you need here
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(`checking the current user is valid. ${currentUser?.email}`);
    if (!currentUser) {
      navigate("/sigin", { state: { from: location } });
    }
  }, [currentUser, navigate]);

  return (
    <React.Fragment>
      <Outlet />
      {children}
    </React.Fragment>
  );
};

export default ProtectedRoute;
