import { FC, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogoFull } from "../../assets";
import { userService } from "../../services";
import { useDispatch } from "react-redux";
import { deleteMe, updateMe } from "../../redux/actions/me";
import { A, LoadingScreen } from "../../components";

const AuthLayout: FC = () => {
  const location = useLocation();
  const [render, setRender] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userService
      .me()
      .then((response) => {
        dispatch(updateMe(response.data.data.user));
        navigate("/");
        setRender(true);
      })
      .catch(() => {
        setRender(true);
      });
  }, [dispatch, navigate]);

  if (!render) {
    return <LoadingScreen />;
  }
  return (
    <>
      <div className="container mx-auto min-h-screen flex flex-col gap-5 justify-center items-center p-3">
        <div className="bg-white rounded-lg shadow-md px-5 py-8 w-full sm:w-96">
          <Link to="/">
            <img src={LogoFull} alt="Logo" className="h-10 mx-auto mb-4" />
          </Link>
          <Outlet />
        </div>
        <div className="text-slate-500">
          {location.pathname === "/login" ? (
            <>
              Belum punya akun?
              <A to="/register" clasName="ms-1">
                Daftar Sekarang
              </A>
            </>
          ) : (
            <>
              Sudah punya akun?
              <A
                to="/login"
                clasName="ms-1"
                onClick={() => dispatch(deleteMe())}
              >
                Login
              </A>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
