import { FC, useEffect } from "react";
import { DocumentTitle } from "../../layouts";
import { CardList } from "../../components";
import { productService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../redux/actions/product";
import { setLoading } from "../../redux/actions/loading";

const Home: FC = () => {
  DocumentTitle("Home");
  const products = useSelector((state: any) => state.products.products);
  const loading = useSelector((state: any) => state.loading.loading);
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
    <div>
      <CardList data={products} loading={loading} />
    </div>
  );
};

export default Home;
