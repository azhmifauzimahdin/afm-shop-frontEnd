import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Alert, UserNavbar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/actions/loading";
import { productService } from "../../services";
import { setProduct } from "../../redux/actions/product";

const UserLayout: FC = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.message.message);
  const errorMessage = useSelector(
    (state: any) => state.errorMessage.errorMessage
  );

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
      <Alert type="success" hidden={message ? false : true}>
        {message}
      </Alert>
      <Alert type="danger" hidden={errorMessage.length > 0 ? false : true}>
        {errorMessage}
      </Alert>
      <div className="min-h-screen pt-16">
        <UserNavbar />
        <div className="container mx-auto p-2 pt-3 md:pt-6 lg:px-20">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserLayout;
