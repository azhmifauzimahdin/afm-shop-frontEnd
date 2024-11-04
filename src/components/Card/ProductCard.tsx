import { FC } from "react";
import { Link } from "react-router-dom";
import { Product as ProductProps } from "../../types/product";
import { DefaultProduct, Logo } from "../../assets";
import { FaStar } from "react-icons/fa6";

interface InputProps {
  product: ProductProps;
}

const ProductCard: FC<InputProps> = (props) => {
  const { product } = props;

  return (
    <Link
      to="#"
      className="bg-white border border-gray-200 rounded-lg shadow group overflow-hidden relative"
    >
      <div
        className={`aspect-square group-hover:scale-105 transition duration-500 shadow-sm overflow-hidden`}
      >
        {product.images.length > 0 ? (
          <img
            className="rounded-t-lg w-full"
            src={product.images[0].image_url}
            alt="Product"
          />
        ) : (
          <img
            className="rounded-t-lg w-full"
            src={DefaultProduct}
            alt="Product"
          />
        )}
      </div>
      <div className="p-2">
        <h5 className="overflow-hidden card-title">{product.title}</h5>
        <p className="font-bold mb-1">Rp. {product.price_now}</p>
        {product.discount != 0 ? (
          <div className="flex gap-1 font-semibold text-xs">
            <span className="line-through text-slate-400">
              Rp. {product.price}
            </span>
            <span className="text-orange">{product.discount}%</span>
          </div>
        ) : (
          ""
        )}
        <div className="grid grid-cols-8 text-sm gap-1 text-slate-500 mt-2">
          <div className="flex items-center">
            <img src={Logo} alt="Logo toko" className="w-full" />
          </div>
          <div className="col-span-7">AFM Store</div>
          <div>
            <FaStar className="text-sm text-yellow-500" />
          </div>
          <div className="col-span-7">4.8 | 10rb+ terjual</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
