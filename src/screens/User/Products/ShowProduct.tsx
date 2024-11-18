import { FC, useEffect, useState } from "react";
import { DocumentTitle } from "../../../layouts";
import { useSelector } from "react-redux";
import { Product } from "../../../types/product";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import {
  Button,
  InputGroup,
  NotFound,
  PreviewImageProduct,
  ProgressiveImg,
  Rating,
  ReviewList,
  Title,
} from "../../../components";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DefaultProduct } from "../../../assets";
import Skeleton from "react-loading-skeleton";

interface FormValues {
  amount: number;
}

const ShowProduct: FC = () => {
  DocumentTitle("Detail Produk");
  const { idProduct } = useParams();
  const products = useSelector((state: any) => state.products.products);
  const [product, setProduct] = useState<Product[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);

  useEffect(() => {
    const filterProducts = products.filter(
      (product: Product) => product.id === idProduct
    );
    setProduct(filterProducts);
    if (products.length > 0 && filterProducts.length === 0) setNotFound(true);
  }, [products]);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Jumlah wajib diisi")
      .min(1, "Jumlah harus lebih dari 1")
      .integer("Jumlah harus berupa angka"),
  });

  const handleSubmit = async (values: FormValues) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues: {
      amount: 1,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="bg-white md:bg-transparent p-3 md:p-0 rounded-3xl">
      {notFound ? (
        <div className="h-[80vh] flex justify-center">
          <NotFound />
        </div>
      ) : (
        <div>
          <Title loadingRender={product.length > 0 ? false : true}>
            <span className="text-slate-400">Produk / </span>
            {product[0]?.title}
          </Title>
          <div className="grid grid-cols-8 gap-5 relative mb-3">
            <div className="col-span-8 md:col-span-2 self-start">
              <PreviewImageProduct data={product[0]?.images} />
            </div>
            <div className="col-span-8 md:col-span-4">
              <h1 className="font-bold text-xl">
                {product.length > 0 ? (
                  product[0]?.title
                ) : (
                  <>
                    <Skeleton height={25} />
                    <Skeleton height={25} className="mb-3" />
                  </>
                )}
              </h1>
              {product.length > 0 ? (
                <div className="flex items-center gap-2 mb-1">
                  <span>
                    Terjual <span className="text-red-600"># .</span>
                  </span>
                  <span>
                    <Rating rate={product[0]?.rating.rate} readOnly />
                  </span>
                  <span>{product[0]?.rating.rate}</span>
                  <span className="text-slate-400">
                    ({product[0]?.rating?.reviews.length} ulasan)
                  </span>
                </div>
              ) : (
                <Skeleton width={240} height={25} className="mb-3" />
              )}
              {product.length > 0 ? (
                <div className="text-3xl font-medium">
                  Rp {product[0]?.price_now}
                </div>
              ) : (
                <Skeleton width={140} height={35} className="mb-1" />
              )}
              {product.length > 0 ? (
                <>
                  {product[0]?.discount != 0 ? (
                    <div className="flex gap-1 font-semibold text-xs mt-2">
                      <span className="line-through text-slate-400">
                        Rp {product[0]?.format_price}
                      </span>
                      <span className="text-orange">
                        {product[0]?.discount}%
                      </span>
                    </div>
                  ) : null}
                </>
              ) : (
                <Skeleton height={20} width={170} />
              )}
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="hidden md:block md:col-span-2 md:p-5 rounded-3xl md:shadow-sm md:border self-start"
            >
              <div className="flex gap-3 mb-5">
                {product.length > 0 ? (
                  <ProgressiveImg
                    src={
                      product[0]?.images.length > 0
                        ? product[0].images[0].image_url
                        : DefaultProduct
                    }
                    className="rounded-lg aspect-square shadow h-12"
                  />
                ) : (
                  <Skeleton height={50} width={50} />
                )}
                {product.length > 0 ? (
                  <div className="overflow-hidden self-start card-title font-medium">
                    {product[0]?.title}
                  </div>
                ) : (
                  <div className="flex-grow self-center">
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                  </div>
                )}
              </div>
              <div className="flex gap-3 items-center w-3/4 mb-5">
                <InputGroup
                  id="amount"
                  name="amount"
                  type="number"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  disabled={loading}
                  loadingRender={product.length === 0}
                  inputStyle="text-center"
                  errorMessage={
                    formik.touched.amount && formik.errors.amount
                      ? formik.errors.amount
                      : ""
                  }
                  prepend={
                    <FaMinus
                      onClick={() => {
                        if (formik.values.amount > 1)
                          formik.setFieldValue(
                            "amount",
                            formik.values.amount - 1
                          );
                      }}
                      className="cursor-pointer hover:fill-orange transition-all"
                    />
                  }
                  append={
                    <FaPlus
                      onClick={() =>
                        formik.setFieldValue("amount", formik.values.amount + 1)
                      }
                      className="cursor-pointer hover:fill-orange transition-all"
                    />
                  }
                />
                <div className="whitespace-nowrap">
                  {product.length > 0 ? (
                    <>
                      Stok : <span className="font-bold">#</span>
                    </>
                  ) : (
                    <Skeleton height={20} width={60} />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                {product.length > 0 ? (
                  <>
                    <div className="text-slate-400">Subtotal</div>
                    <div className="font-medium text-lg">
                      Rp {product[0]?.price_now}
                    </div>
                  </>
                ) : (
                  <div className="flex-grow">
                    <Skeleton height={20} />
                  </div>
                )}
              </div>
              <div className="flex justify-between gap-3">
                <Button
                  type="submit"
                  color="outline-primary"
                  className="flex-grow"
                  loadingRender={product.length === 0}
                >
                  Beli
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  loadingRender={product.length === 0}
                >
                  <div className="flex items-center gap-2">
                    <FaPlus className="inline" /> Keranjang
                  </div>
                </Button>
              </div>
            </form>
          </div>
          <div className="mb-3">
            {product.length > 0 ? (
              <>
                <h1 className="text-xl text-orange font-medium mb-3">
                  Deskripsi
                </h1>
                <div>{parse(`${product[0]?.description}`)}</div>
              </>
            ) : (
              <>
                <Skeleton height={30} width={80} className="mb-3" />
                <Skeleton height={100} />
              </>
            )}
          </div>
          <div className="mb-10">
            {product.length > 0 ? (
              <>
                <h1 className="text-xl text-orange font-medium mb-3">Ulasan</h1>
                <ReviewList data={product[0].rating} />
              </>
            ) : (
              <>
                <Skeleton height={30} width={80} className="mb-3" />
                <Skeleton height={100} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProduct;
