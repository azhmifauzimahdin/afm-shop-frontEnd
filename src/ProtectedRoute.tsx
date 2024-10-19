import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface InputProps {
  isAuthenticated: boolean;
}

const ProtectedRoute: FC<InputProps> = (props) => {
  const { isAuthenticated } = props;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
