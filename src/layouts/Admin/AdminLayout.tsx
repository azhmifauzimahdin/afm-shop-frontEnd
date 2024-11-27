import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoFull } from "../../assets";
import { CiLock, CiLogout, CiShop, CiUser } from "react-icons/ci";
import { Alert, NavLink, ProgressiveImg } from "../../components";
import { useClickOutside } from "../../hooks/useClickOutside";
import { FaBars } from "react-icons/fa6";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { authAdminService, productService } from "../../services";
import { deleteAdmin } from "../../redux/actions/admin";
import { MdOutlineDashboard } from "react-icons/md";
import { setLoading } from "../../redux/actions/loading";
import { setProduct } from "../../redux/actions/product";
import { LiaComment } from "react-icons/lia";

const AdminLayout: FC = () => {
  const me = useSelector((state: any) => state.admin.admin);
  const [toggleNavbar, setToggleNavbar] = useState<boolean>(false);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const refNavbar = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[2];
  const message = useSelector((state: any) => state.message.message);
  const errorMessage = useSelector(
    (state: any) => state.errorMessage.errorMessage
  );

  useClickOutside(refNavbar, () => setToggleNavbar(false));

  const handleCloseSidebar = () => {
    if (toggleSidebar) setToggleSidebar(false);
  };

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
      <Alert type="success" hidden={message ? false : true}>
        {message}
      </Alert>
      <Alert type="danger" hidden={errorMessage.length > 0 ? false : true}>
        {errorMessage}
      </Alert>
      <div className="bg-slate-100 min-h-screen relative">
        <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-40">
          <div className="px-3 py-2 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <div
                  className="inline-flex items-center p-1.5 rounded-lg sm:hidden cursor-pointer hover:bg-white text-xl text-slate-700 hover:text-slate-600"
                  onClick={() => setToggleSidebar(!toggleSidebar)}
                >
                  <FaBars />
                </div>
                <Link to="/admin/dashboard" className="flex ms-2">
                  <ProgressiveImg src={LogoFull} alt="logo" className="h-8" />
                </Link>
              </div>
              <div className="md:flex gap-2">
                <div
                  ref={refNavbar}
                  onClick={() => setToggleNavbar(!toggleNavbar)}
                  onMouseEnter={() => setToggleNavbar(true)}
                  onMouseLeave={() => setToggleNavbar(false)}
                  className="flex items-center gap-3 p-1 rounded-lg md:hover:bg-slate-100 hover:text-slate-900 cursor-pointer relative z-50 transition-all"
                >
                  <div className="h-8 aspect-square rounded-full mx-auto overflow-hidden">
                    <ProgressiveImg
                      src={me.image_url}
                      className="w-full"
                      alt="User Image"
                    />
                  </div>
                  <h1 className="w-28 truncate hidden md:block">{me.name}</h1>
                  <div
                    id="user-menu"
                    ref={refNavbar}
                    onClick={() => setToggleNavbar(false)}
                    className={`z-50 absolute top-10 right-0 bg-white rounded-lg shadow overflow-hidden transition-all duration-700 ${
                      !toggleNavbar ? "h-0" : "h-40"
                    }`}
                  >
                    <div className="grid gap-2 w-auto text-nowrap p-4">
                      <div className="flex items-center gap-3 border-b pb-3 border-b-slate-300">
                        <div className="h-10 aspect-square rounded-full mx-auto overflow-hidden">
                          <ProgressiveImg
                            src={me.image_url}
                            className="w-full"
                            alt="User Image"
                          />
                        </div>
                        <div>
                          <h1 className="w-44 truncate font-medium">
                            {me.name}
                          </h1>
                          <div className="w-44 text-xs truncate">
                            {me.email}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1">
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
          className={`fixed top-14 pt-3 left-0 z-30 w-64 h-screen transition-transform duration-700 -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 ${
            toggleSidebar ? "transform-none" : "-translate-x-full"
          }`}
          aria-label="Sidebar"
          aria-modal={toggleSidebar}
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
            <ul className="space-y-2 font-medium">
              <li>
                <NavLink
                  to="/admin/dashboard"
                  type="admin"
                  active={location === "dashboard"}
                  onClick={() => setToggleSidebar(false)}
                >
                  <MdOutlineDashboard className="text-lg" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/products"
                  type="admin"
                  active={location === "products"}
                  onClick={async () => {
                    setToggleSidebar(false);
                    try {
                      dispatch(setLoading(true));
                      const response = await productService.getAll();
                      dispatch(setProduct(response.data.data.products));
                      dispatch(setLoading(false));
                    } catch (error) {
                      dispatch(setLoading(false));
                      console.log(error);
                    }
                  }}
                >
                  <CiShop className="text-lg" />
                  Produk
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/chat"
                  type="admin"
                  active={location === "chat"}
                  onClick={() => setToggleSidebar(false)}
                >
                  <LiaComment className="text-lg font-thin" />
                  Chat
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/change-password"
                  type="admin"
                  active={location === "change-password"}
                  onClick={() => setToggleSidebar(false)}
                >
                  <CiLock className="text-lg" />
                  Ganti Kata Sandi
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>

        <div
          className="p-3 sm:ml-64 pt-16 min-h-screen "
          onClick={handleCloseSidebar}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
