import { FC, useEffect, useState } from "react";
import { DocumentTitle } from "../../layouts";
import { CardList } from "../../components";
import { productService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../redux/actions/product";

const Home: FC = () => {
  DocumentTitle("Home");
  const products = useSelector((state: any) => state.products.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll("");
      dispatch(setProduct(response.data.data.products));
      setLoading(false);
    } catch (error) {
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
