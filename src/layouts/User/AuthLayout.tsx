import { FC, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogoFull } from "../../assets/Index";
import { userService } from "../../services";
import { useDispatch } from "react-redux";
import { updateMe } from "../../redux/actions/me";
import { LoadingScreen } from "../../components";

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
              <Link to="/register" className="ms-1 text-orange">
                Daftar Sekarang
              </Link>
            </>
          ) : (
            <>
              Sudah punya akun?
              <Link to="/login" className="ms-1 text-orange">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
