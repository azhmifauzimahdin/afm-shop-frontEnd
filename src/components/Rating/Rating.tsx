import { FC, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

interface RatingProps {
  rate?: number;
  onClick?: (arg: number) => void;
  readOnly?: boolean;
}
const Rating: FC<RatingProps> = (props) => {
  const { rate, onClick, readOnly } = props;

  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  useEffect(() => {
    if (rate) setRating(rate);
    if (onClick) onClick(rating);
  }, [onClick, rate, rating]);

  return (
    <>
      <div className="text-lg pt-1">
        {[...Array(5)].map((_, index) => {
          index += 1;
          return (
            <button
              key={index}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
              disabled={readOnly}
            >
              <FaStar
                className={
                  index <= (hover || rating)
                    ? "fill-yellow-300"
                    : "fill-slate-300"
                }
              />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Rating;
