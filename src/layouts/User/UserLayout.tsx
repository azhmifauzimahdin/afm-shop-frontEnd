import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { UserNavbar } from "../../components";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions/loading";
import { productService } from "../../services";
import { setProduct } from "../../redux/actions/product";

const UserLayout: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      dispatch(setLoading(true));
      const response = await productService.getAll();
      dispatch(setProduct(response.data.data.products));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen pt-16">
        <UserNavbar />
        <div className="container mx-auto p-2 pt-3 md:pt-6 lg:px-20 h-screen-navbar">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserLayout;
