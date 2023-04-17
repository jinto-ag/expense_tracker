import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface CustomProps {}

type PrivateRouteProps = RouteProps & CustomProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({ ...rest }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        state={{ message: "You must be logged in to access this page" }}
      />
    );
  }

  return <Route {...rest} />;
};

export default PrivateRoute;
