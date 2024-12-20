import { FC, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoFull } from "../../assets";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import { authService, productService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { deleteMe } from "../../redux/actions/me";
import {
  Button,
  InputGroup,
  NavLink,
  ProgressiveImg,
  UserSidebar,
} from "../../components";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { CiLogout, CiShoppingCart, CiUser } from "react-icons/ci";
import { GoCommentDiscussion } from "react-icons/go";
import { PiShoppingBag } from "react-icons/pi";
import { setProduct } from "../../redux/actions/product";
import { me } from "../../types/user";
import { setLoading } from "../../redux/actions/loading";

const UserNavbar: FC = () => {
  const location = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();
  const me: me = useSelector((state: any) => state.me.me);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [toggleMobile, setToggleMobile] = useState(false);
  const [search, setSearch] = useState("");

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

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await productService.getAll(search);
      dispatch(setProduct(response.data.data.products));
      dispatch(setLoading(false));
      navigate("/");
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 z-40 w-full bg-white shadow">
      <nav
        id="main-navbar"
        className="container mx-auto p-3 lg:px-20 flex items-center gap-6 md:gap-10 transition-all duration-500"
      >
        <Link to="/" className="hidden sm:block w-full">
          <ProgressiveImg src={LogoFull} alt="Logo AFM" className="h-8" />
        </Link>
        <button
          onClick={() => navigate(-1)}
          className={`sm:hidden ${!location && "hidden"}`}
        >
          <FaArrowLeft />
        </button>
        <form onSubmit={handleSearch} className="w-full">
          <InputGroup
            type="search"
            id="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari di AFM Shop"
            prepend={<FaMagnifyingGlass className="text-lg text-slate-500" />}
          />
        </form>
        {me.email ? (
          <div className="flex items-center gap-1 relative">
            <Link
              to="/chat"
              className="p-2 rounded-3xl hover:bg-slate-100 text-lg"
            >
              <GoCommentDiscussion className="text-xl" />
            </Link>
            <Link to="" className="p-2 rounded-3xl hover:bg-slate-100 text-lg">
              <PiShoppingBag className="text-xl" />
            </Link>
            <div
              className={`hidden md:flex gap-2 ${
                location == "account" && "md:hidden"
              }`}
            >
              <div className="my-2 border border-slate-400 mx-2"></div>
              <div
                onMouseEnter={() => setToggle(true)}
                onMouseLeave={() => setToggle(false)}
                className="flex items-center gap-3 p-1 rounded-3xl hover:bg-slate-100 cursor-pointer relative z-50"
              >
                <div className="h-8 aspect-square rounded-full mx-auto overflow-hidden">
                  <ProgressiveImg
                    src={me.image_url}
                    className="w-full"
                    alt="User Image"
                  />
                </div>
                <h1 className="w-28 truncate">{me.name}</h1>
                <div
                  id="user-menu"
                  onMouseEnter={() => setToggle(true)}
                  onClick={() => setToggle(false)}
                  className={`absolute top-10 right-0 bg-white rounded-3xl shadow overflow-hidden transition-all duration-700 ${
                    !toggle ? "h-0" : "h-48"
                  }`}
                >
                  <div className="grid gap-2 w-auto text-nowrap p-3">
                    <div className="flex items-center gap-3 border-b pb-3 border-b-slate-300">
                      <div className="h-10 aspect-square rounded-full mx-auto overflow-hidden">
                        <ProgressiveImg
                          src={me.image_url}
                          className="w-full"
                          alt="User Image"
                        />
                      </div>
                      <div>
                        <h1 className="w-44 truncate font-medium">{me.name}</h1>
                        <div className="w-44 text-xs truncate">{me.email}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1">
                      <NavLink to="/account/profile">
                        <CiUser className="text-lg" />
                        Akun Saya
                      </NavLink>
                      <NavLink to="/my-order">
                        <CiShoppingCart className="text-lg" />
                        Pesanan Saya
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
            <div
              className="md:hidden cursor-pointer rounded-3xl hover:bg-slate-100 p-2"
              onClick={() => setToggleMobile(true)}
            >
              <FaBars />
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
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
              onClick={() => navigate("register")}
            >
              Daftar
            </Button>
          </div>
        )}
      </nav>
      <nav
        className={`absolute top-0 w-full bg-white z-50 overflow-hidden transition-all duration-500 ${
          !toggleMobile ? "h-0" : "h-screen"
        }`}
      >
        <div className="p-3 lg:px-5 flex justify-between items-center border border-b-slate-100 mb-3">
          <Link to="/">
            <ProgressiveImg
              src={LogoFull}
              alt="Logo AFM"
              className="h-6"
              onClick={() => setToggleMobile(false)}
            />
          </Link>
          <div
            className="toggle-menu cursor-pointer"
            onClick={() => setToggleMobile(false)}
          >
            <FaXmark className="text-xl text-slate-600" />
          </div>
        </div>
        <div className="p-3 z-50">
          <UserSidebar me={me} onClick={() => setToggleMobile(false)} />
        </div>
      </nav>
    </div>
  );
};

export default UserNavbar;
