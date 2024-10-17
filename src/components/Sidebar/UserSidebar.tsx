import { FC } from "react";
import { me } from "../../types/user";
import { Authentication, defaultUser } from "../../assets";
import { Button, NavLink } from "..";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../services";
import { useDispatch } from "react-redux";
import { deleteMe } from "../../redux/actions/me";
import { CiLock, CiLogout, CiUser } from "react-icons/ci";

interface InputProps {
  me: me;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
const UserSidebar: FC<InputProps> = (props) => {
  const { me, onClick } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[2];

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

  return (
    <>
      {me.email ? (
        <>
          <div className="flex items-center gap-3 border-b pb-3 border-b-slate-200 mb-5">
            <div className="h-10 aspect-square rounded-full overflow-hidden">
              {me.image ? (
                <img src={me.image} className="w-full" alt="User Image" />
              ) : (
                <img src={defaultUser} className="w-full" alt="User Image" />
              )}
            </div>
            <div>
              <h1 className="w-44 truncate font-medium">{me.name}</h1>
              <div className="w-44 text-xs truncate">{me.email}</div>
            </div>
          </div>

          <div className="grid gap-4" onClick={onClick}>
            <NavLink to="/account/profile" active={location === "profile"}>
              <CiUser className="text-lg" />
              Profil Saya
            </NavLink>
            <NavLink
              to="/account/change-password"
              active={location === "change-password"}
            >
              <CiLock className="text-lg font-thin" />
              Ganti Kata Sandi
            </NavLink>
            <NavLink to="" onClick={handleLogout}>
              <CiLogout className="text-lg" />
              Logout
            </NavLink>
          </div>
        </>
      ) : (
        <div className="flex items-center flex-wrap h-[80vh]">
          <div>
            <img src={Authentication} alt="Autentikasi" className="w-full" />
            <div className="flex justify-center gap-3 w-full">
              <Button
                type="button"
                color="outline-primary"
                onClick={() => navigate("/login")}
              >
                Masuk
              </Button>
              <Button
                type="button"
                color="primary"
                onClick={() => navigate("/register")}
              >
                Daftar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSidebar;
