import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { authService, userService } from "../../services";
import { deleteMe, updateMe } from "../../redux/actions/me";
import { Button, LoadingScreen } from "../../components";

const UserLayout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  useEffect(() => {
    userService
      .me()
      .then((response) => {
        dispatch(updateMe(response.data.data.user));
        setRender(true);
      })
      .catch(() => {
        navigate("/login");
        setRender(true);
      });
  }, [dispatch, navigate]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("ACCESS_TOKEN");
      navigate("/login");
      dispatch(deleteMe());
    } catch (error) {
      console.log(error);
    }
  };

  if (!render) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <Button color="link" type="button" onClick={handleLogout}>
          Logout
        </Button>
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
