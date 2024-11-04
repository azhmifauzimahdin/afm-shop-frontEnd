import { FC } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LogoFull } from "../../assets";
import { useDispatch } from "react-redux";
import { deleteMe } from "../../redux/actions/me";
import { A } from "../../components";

const AuthLayout: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <>
      <div className="container mx-auto min-h-screen flex flex-col gap-5 justify-center items-center p-3">
        <div className="bg-white rounded-lg shadow-md px-5 py-8 w-full sm:w-96">
          {location.pathname !== "/admin/login" ? (
            <Link to="/">
              <img src={LogoFull} alt="Logo" className="h-10 mx-auto mb-4" />
            </Link>
          ) : (
            ""
          )}
          <Outlet />
        </div>
        <div className="text-slate-500">
          {location.pathname === "/admin/login" ? (
            ""
          ) : location.pathname === "/login" ? (
            <>
              Belum punya akun?
              <A to="/register" className="ms-1">
                Daftar Sekarang
              </A>
            </>
          ) : (
            <>
              Sudah punya akun?
              <A
                to="/login"
                className="ms-1"
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
