import { FC, useEffect } from "react";
import { DocumentTitle } from "../../layouts";
import { CardList } from "../../components";
import { productService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../redux/actions/product";

const Home: FC = () => {
  DocumentTitle("Home");
  const products = useSelector((state: any) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await productService.getAll("");
      dispatch(setProduct(response.data.data.products));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CardList data={products} />
    </div>
  );
};

export default Home;
