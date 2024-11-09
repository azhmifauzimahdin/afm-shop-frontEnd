import { FC, useEffect, useState } from "react";
import { BlankImage } from "../../assets";

interface InputProps {
  src: any;
  id?: string;
  alt?: string;
  className?: string;
  onClick?: any;
  loading?: boolean;
}

const ProgressiveImg: FC<InputProps> = (props) => {
  const { src, alt, className, onClick, loading } = props;
  const [imgSrc, setImgSrc] = useState(BlankImage);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className} ${
        loading && imgSrc !== src ? "loading" : "loaded"
      }`}
      onClick={onClick}
    />
  );
};

export default ProgressiveImg;
