import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputEditor,
  InputGroup,
  InputMultipleImage,
} from "../../../components";
import { DocumentTitle } from "../../../layouts";
import { Product } from "../../../types/product";
import { useSelector } from "react-redux";

const ShowProduct: FC = () => {
  DocumentTitle("Edit Produk");
  const navigate = useNavigate();
  const idProduct = useSelector((state: any) => state.id.id);
  const products = useSelector((state: any) => state.products.products);
  const [product] = useState<Product[]>(
    products
      ? products.filter((product: Product) => product.id === idProduct)
      : []
  );
  const [images] = useState<any[]>(
    products.length > 0 ? product[0].images : []
  );

  useEffect(() => {
    if (!idProduct) navigate("/admin/products");
  }, []);

  return (
    <>
      <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center mb-4">
        <div className="font-medium text-2xl">Detail Produk</div>
        <div className="text-xs md:text-sm">
          <Link to="/admin/dashboard" className="text-blue-700 me-1.5">
            Home
          </Link>
          <span className="me-1.5">/</span>
          <Link to="/admin/products" className="text-blue-700 me-1.5">
            Produk
          </Link>
          / Detail Produk
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <form encType="multipart/form-data">
          <div className="grid md:grid-cols-3 gap-3 md:gap-10">
            <div className="md:col-span-2 grid gap-3 order-3 self-start">
              <Input
                label="NAMA"
                type="text"
                id="title"
                name="title"
                value={product[0]?.title}
                disabled
              />
              <InputEditor
                label="DESKRIPSI"
                id="description"
                name="description"
                value={product[0]?.description}
                disabled
              />
              <div className="flex flex-col md:flex-row gap-3">
                <InputGroup
                  label="HARGA"
                  type="number"
                  id="price"
                  name="price"
                  disabled
                  value={product[0]?.price}
                  width="md:w-28"
                  prepend={<p>Rp.</p>}
                />
                <InputGroup
                  label="DISKON"
                  type="number"
                  id="discount"
                  name="discount"
                  disabled
                  value={product[0]?.discount}
                  width="w-[74px]"
                  append={<p>%</p>}
                />
              </div>
            </div>
            <div className="order-2 md:order-3">
              <div>
                <InputMultipleImage
                  label="FOTO"
                  id="images"
                  name="images"
                  editImages={images}
                  disableAddButton
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button
              type="button"
              color="secondary"
              onClick={() => navigate("/admin/products")}
            >
              Kembali
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShowProduct;
