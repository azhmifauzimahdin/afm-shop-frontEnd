import { FC } from "react";
import ProductCard from "./ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface InputProps {
  data: any[];
  loading: boolean;
}

const CardList: FC<InputProps> = (props) => {
  const { data, loading } = props;
  const dataLoading: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {loading ? (
        <>
          {dataLoading.map((data) => (
            <div className="bg-slate-50/70 rounded-lg" key={data}>
              <div className="mx-1">
                <Skeleton className="aspect-square" />
              </div>
              <div className="p-1 mb-2">
                <Skeleton height={20} className="mb-1" />
                <Skeleton height={20} width={100} className="mb-1" />
                <Skeleton height={20} width={130} className="mb-1" />
                <Skeleton height={20} width={160} />
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {data.map((data) => (
            <ProductCard product={data} key={data.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default CardList;
