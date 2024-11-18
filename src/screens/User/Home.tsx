import { FC } from "react";
import { DocumentTitle } from "../../layouts";
import { CardList } from "../../components";
import { useSelector } from "react-redux";

const Home: FC = () => {
  DocumentTitle("Home");
  const products = useSelector((state: any) => state.products.products);
  const loading = useSelector((state: any) => state.loading.loading);
  return (
    <div>
      <CardList data={products} loading={loading} navigate="product" />
    </div>
  );
};

export default Home;
