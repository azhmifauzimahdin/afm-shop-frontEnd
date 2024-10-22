import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { adminService, userService } from "./services";
import { deleteMe, updateMe } from "./redux/actions/me";
import { LoadingScreen } from "./components";
import { deleteAdmin, updateAdmin } from "./redux/actions/admin";

interface InputProps {
  isAuthenticated: boolean;
}

export const User: FC = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (token) {
      userService
        .me()
        .then((response) => {
          dispatch(updateMe(response.data.data.user));
          setRender(true);
        })
        .catch(() => {
          setRender(true);
          dispatch(deleteMe());
        });
    } else {
      setRender(true);
      dispatch(deleteMe());
    }
  }, [dispatch, token]);

  if (!render) {
    return <LoadingScreen />;
  }

  return <Outlet />;
};

export const AuthenticateUser: FC<InputProps> = (props) => {
  const { isAuthenticated } = props;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const RedirectIfAuthenticatedUser: FC<InputProps> = (props) => {
  const { isAuthenticated } = props;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const Admin: FC = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (token) {
      adminService
        .me()
        .then((response) => {
          dispatch(updateAdmin(response.data.data.user));
          setRender(true);
        })
        .catch(() => {
          setRender(true);
          dispatch(deleteAdmin());
        });
    } else {
      setRender(true);
      dispatch(deleteAdmin());
    }
  }, [dispatch, token]);

  if (!render) {
    return <LoadingScreen />;
  }

  return <Outlet />;
};

export const AuthenticateAdmin: FC<InputProps> = (props) => {
  const { isAuthenticated } = props;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export const RedirectIfAuthenticatedAdmin: FC<InputProps> = (props) => {
  const { isAuthenticated } = props;

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};
