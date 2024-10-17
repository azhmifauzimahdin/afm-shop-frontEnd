import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LoadingScreen, UserNavbar } from "../../components";
import { useDispatch } from "react-redux";
import { userService } from "../../services";
import { deleteMe, updateMe } from "../../redux/actions/me";

const UserLayout: FC = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  }, [dispatch, navigate, token]);

  if (!render) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="min-h-screen">
        <UserNavbar />
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserLayout;
