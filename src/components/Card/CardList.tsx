import { FC } from "react";
import ProductCard from "./ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setID } from "../../redux/actions/id";

interface InputProps {
  data: any[];
  loading: boolean;
  navigate?: string;
}

const CardList: FC<InputProps> = (props) => {
  const { data, loading, navigate } = props;
  const usenavigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {loading ? (
        <>
          {[...Array(12)].map((_, index) => (
            <div className="bg-slate-50/70 rounded-lg" key={index}>
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
            <ProductCard
              product={data}
              key={data.id}
              onClick={() => {
                dispatch(setID(data.id));
                usenavigate(navigate ? `${navigate}/${data.id}` : "");
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CardList;
