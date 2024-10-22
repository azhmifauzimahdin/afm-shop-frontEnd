import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultUser } from "../../assets";
import { CiLogout, CiUser } from "react-icons/ci";
import { NavLink } from "../../components";
import { useClickOutside } from "../../hooks/useClickOutside";
import { FaBars } from "react-icons/fa6";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { authAdminService } from "../../services";
import { deleteAdmin } from "../../redux/actions/admin";
import { MdOutlineDashboard } from "react-icons/md";

const AdminLayout: FC = () => {
  const me = useSelector((state: any) => state.admin.admin);
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const refNavbar = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[2];

  useClickOutside(refNavbar, () => setToggleNavbar(false));

  const handleLogout = async () => {
    try {
      await authAdminService.logout();
      localStorage.removeItem("ACCESS_TOKEN");
      navigate("/admin/login");
      dispatch(deleteAdmin());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-orange text-white z-50">
        <div className="px-3 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <div
                className="inline-flex items-center p-1.5 rounded-lg sm:hidden cursor-pointer hover:bg-white text-xl text-white hover:text-slate-600"
                onClick={() => setToggleSidebar(!toggleSidebar)}
              >
                <FaBars />
              </div>
              <Link to="https://flowbite.com" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap">
                  AFM SHOP
                </span>
              </Link>
            </div>
            <div className="md:flex gap-2">
              <div
                ref={refNavbar}
                onClick={() => setToggleNavbar(!toggleNavbar)}
                onMouseEnter={() => setToggleNavbar(true)}
                onMouseLeave={() => setToggleNavbar(false)}
                className="flex items-center gap-3 p-1 rounded-lg hover:bg-white hover:text-slate-900 cursor-pointer relative z-50 transition-all"
              >
                <div className="h-8 aspect-square rounded-full mx-auto overflow-hidden">
                  {me.image ? (
                    <img src={me.image} className="w-full" alt="User Image" />
                  ) : (
                    <img
                      src={defaultUser}
                      className="w-full"
                      alt="User Image"
                    />
                  )}
                </div>
                <h1 className="w-28 truncate hidden md:block">{me.name}</h1>
                <div
                  id="user-menu"
                  ref={refNavbar}
                  onClick={() => setToggleNavbar(false)}
                  className={`absolute top-10 right-0 bg-white rounded-lg shadow overflow-hidden transition-all duration-700 ${
                    !toggleNavbar ? "h-0" : "h-36"
                  }`}
                >
                  <div className="grid gap-2 w-auto text-nowrap p-4">
                    <div className="flex items-center gap-3 border-b pb-3 border-b-slate-300 mb-1">
                      <div className="h-10 aspect-square rounded-full mx-auto overflow-hidden">
                        {me.image ? (
                          <img
                            src={me.image}
                            className="w-full"
                            alt="User Image"
                          />
                        ) : (
                          <img
                            src={defaultUser}
                            className="w-full"
                            alt="User Image"
                          />
                        )}
                      </div>
                      <div>
                        <h1 className="w-44 truncate font-medium">{me.name}</h1>
                        <div className="w-44 text-xs truncate">{me.email}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <NavLink to="/account/profile">
                        <CiUser className="text-lg" />
                        Akun Saya
                      </NavLink>
                      <NavLink onClick={handleLogout}>
                        <CiLogout className="text-lg" />
                        Logout
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-14 pt-3 left-0 z-40 w-64 h-screen transition-transform duration-700 -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 ${
          toggleSidebar ? "transform-none" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
        aria-modal={toggleSidebar}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink to="#" type="admin" active={location === "dashboard"}>
                <MdOutlineDashboard className="text-lg" />
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
