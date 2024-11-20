import { FC, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Rating, Review as TypeReview } from "../../types/product";
import ProgressBar from "../ProgressBar/ProgressBar";
import Review from "./Review";
import { Button } from "..";

interface InputProps {
  data: Rating;
}

const ReviewList: FC<InputProps> = (props) => {
  const { data } = props;
  const [reviews, setReviews] = useState<TypeReview[]>();
  const [star, setStar] = useState<number>(0);

  useEffect(() => {
    setReviews(data.reviews);
  }, [data.reviews]);

  const filterStar = (star: number) => {
    const result = filter(data.reviews, star);
    setReviews(result);
  };

  const filter = (data: TypeReview[] | undefined, star: number) => {
    const filteredDatas = data
      ? data.filter((data) => data.rating === star)
      : [];
    return filteredDatas;
  };

  const sort = (direction: "asc" | "desc") => {
    const sortedDatas = data.reviews.sort((a, b) => {
      if (direction === "asc") return a.date > b.date ? 1 : -1;
      return a.date < b.date ? 1 : -1;
    });

    setReviews(sortedDatas);
  };

  return (
    <>
      {data.reviews && data.reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="flex justify-center items-center gap-2 mb-3">
              <FaStar className="fill-yellow-300 text-2xl" />
              <div>
                <span className="text-6xl">{data.rate}</span>
                <span className="text-slate-500">/ 5</span>
              </div>
            </div>
            <div className="text-slate-500 text-center">
              {data.reviews.length} Ulasan
            </div>
            <div className="p-2">
              {[5, 4, 3, 2, 1].map((item, index) => (
                <div className="flex gap-2 items-center mb-1" key={index}>
                  <FaStar className="fill-yellow-300" /> {item}
                  <ProgressBar width={data.percentage_rate[index]} />
                  {data.specific_rate[index]}
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-center flex-wrap pb-4 pt-2 border-b border-slate-200 md:border-none">
              <Button
                type="button"
                color="outline-primary"
                size="sm"
                onClick={() => {
                  setStar(0);
                  setReviews(data.reviews);
                }}
                className={`${star === 0 ? "bg-orange text-white" : ""}`}
              >
                Semua
              </Button>
              {[5, 4, 3, 2, 1].map((data, index) => (
                <Button
                  type="button"
                  color="outline-primary"
                  size="sm"
                  onClick={() => {
                    setStar(data);
                    filterStar(data);
                  }}
                  key={index}
                  className={`${star === data ? "bg-orange text-white" : ""}`}
                >
                  Bintang {data}
                </Button>
              ))}
              <Button
                type="button"
                color="outline-primary"
                size="sm"
                onClick={() => {
                  setStar(6);
                  sort("asc");
                }}
                className={`${star === 6 ? "bg-orange text-white" : ""}`}
              >
                Terbaru
              </Button>
              <Button
                type="button"
                color="outline-primary"
                size="sm"
                onClick={() => {
                  setStar(7);
                  sort("desc");
                }}
                className={`${star === 7 ? "bg-orange text-white" : ""}`}
              >
                Terlama
              </Button>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="flex flex-col gap-3">
              {reviews && reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <Review data={review} key={index} />
                ))
              ) : (
                <div>Tidak ada ulasan</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Belum ada ulasan</div>
      )}
    </>
  );
};

export default ReviewList;
