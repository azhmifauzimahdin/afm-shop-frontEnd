import { FC } from "react";
import ProductCard from "./ProductCard";

interface InputProps {
  data: any[];
}

const CardList: FC<InputProps> = (props) => {
  const { data } = props;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {data.map((data) => (
        <ProductCard product={data} key={data.id} />
      ))}
    </div>
  );
};

export default CardList;
