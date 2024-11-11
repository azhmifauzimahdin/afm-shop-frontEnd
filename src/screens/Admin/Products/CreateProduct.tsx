import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Input,
  InputEditor,
  InputGroup,
  InputMultipleImage,
} from "../../../components";
import { DocumentTitle } from "../../../layouts";
import { useFormik } from "formik";
import * as Yup from "yup";
import { productService } from "../../../services";
import { ProductRequest } from "../../../types/product";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../redux/actions/message";
import { addProduct } from "../../../redux/actions/product";

interface FormValues {
  title: string;
  description: string;
  price: number;
  discount: number;
  images: any;
}

const CreateProduct: FC = () => {
  DocumentTitle("Tambah Produk");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Nama wajib diisi"),
    description: Yup.string().required("Deskripsi wajib diisi"),
    price: Yup.number()
      .required("Harga wajib diisi")
      .min(1, "Harga harus lebih dari 1 rupiah")
      .integer("Harga harus berupa angka"),
    discount: Yup.number()
      .required("Diskon wajib diisi")
      .integer("Diskon harus berupa angka")
      .min(0, "Diskon harus lebih dari atau sama dengan 0"),
    images: Yup.mixed()
      .test("fileSize", "Masksimal ukuran file 1 MB", (value: any) => {
        if (value && value?.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (value[i].size > 1000000) {
              return false;
            }
          }
        }
        return true;
      })
      .test("fileFormat", "Format gambar: JPG, JPEG, PNG", (value: any) => {
        const FormatSupported = ["image/jpg", "image/jpeg", "image/png"];
        if (value && value?.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (!FormatSupported.includes(value[i].type)) {
              return false;
            }
          }
        }
        return true;
      }),
  });

  const handleSubmit = async (values: FormValues) => {
    setErrorMessage("");
    try {
      dispatch(setMessage(""));
      setLoading(true);
      const response = await productService.addProduct(
        values as ProductRequest
      );
      dispatch(addProduct(response.data.data.product));
      dispatch(setMessage(response.data.message));
      setLoading(false);
      navigate("/admin/products");
    } catch (error: any) {
      setLoading(false);
      setErrorMessage("Terjadi kesalahan");
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      discount: 0,
      images: [],
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Alert type="danger" hidden={errorMessage ? false : true}>
        {errorMessage}
      </Alert>
      <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center mb-4">
        <div className="font-medium text-2xl">Tambah Produk</div>
        <div className="text-xs md:text-sm">
          <Link to="/admin/dashboard" className="text-blue-700 me-1.5">
            Home
          </Link>
          <span className="me-1.5">/</span>
          <Link to="/admin/products" className="text-blue-700 me-1.5">
            Produk
          </Link>
          / Tambah Produk
        </div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div className="grid md:grid-cols-3 gap-3 md:gap-10">
            <div className="md:col-span-2 grid gap-3 order-3 self-start">
              <Input
                label="NAMA"
                type="text"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                disabled={loading}
                placeholder="Masukan nama"
                errorMessage={
                  formik.touched.title && formik.errors.title
                    ? formik.errors.title
                    : ""
                }
              />
              <InputEditor
                label="DESKRIPSI"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue(
                    "description",
                    e.target.value !== "<br>" ? e.target.value : ""
                  );
                }}
                disabled={loading}
                errorMessage={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : ""
                }
              />
              <div className="flex flex-col md:flex-row gap-3">
                <InputGroup
                  label="HARGA"
                  type="number"
                  id="price"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  disabled={loading}
                  width="md:w-28"
                  placeholder="Masukan harga"
                  errorMessage={
                    formik.touched.price && formik.errors.price
                      ? formik.errors.price
                      : ""
                  }
                  prepend={<p>Rp.</p>}
                />
                <InputGroup
                  label="DISKON"
                  type="number"
                  id="discount"
                  name="discount"
                  value={formik.values.discount}
                  onChange={formik.handleChange}
                  disabled={loading}
                  width="w-[74px]"
                  append={<p>%</p>}
                  errorMessage={
                    formik.touched.discount && formik.errors.discount
                      ? formik.errors.discount
                      : ""
                  }
                />
              </div>
            </div>
            <div className="order-2 md:order-3">
              <div>
                <InputMultipleImage
                  label="FOTO"
                  id="images"
                  name="images"
                  disabled={loading}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.files) return;
                    const filesArray = Array.from(e.target.files as any);
                    formik.setFieldValue("images", filesArray);
                  }}
                  value={(data: any) => {
                    formik.setFieldValue("images", data);
                  }}
                  src={formik.values.images}
                  errorMessage={
                    formik.touched.images && formik.errors.images
                      ? formik.errors.images
                      : ""
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button type="submit" color="primary" disabled={loading}>
              Simpan
            </Button>
            <Button
              type="button"
              color="secondary"
              disabled={loading}
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

export default CreateProduct;
