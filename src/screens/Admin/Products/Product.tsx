import { FC, useEffect, useState } from "react";
import { Alert, Button, Modal, Table } from "../../../components";
import { productService } from "../../../services";
import { Question } from "../../../assets";
import { FaEye, FaPen, FaTrash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { delProduct, setProduct } from "../../../redux/actions/product";
import { DocumentTitle } from "../../../layouts";
import { setMessage } from "../../../redux/actions/message";
import { setID } from "../../../redux/actions/id";
import { TableColumn } from "../../../components/Table/Table";
import { setLoading } from "../../../redux/actions/loading";

const Product: FC = () => {
  DocumentTitle("Produk");
  const products = useSelector((state: any) => state.products.products);
  const loading = useSelector((state: any) => state.loading.loading);
  const message = useSelector((state: any) => state.message.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (products.length === 0) getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      dispatch(setLoading(true));
      const response = await productService.getAll();
      dispatch(setProduct(response.data.data.products));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };

  const columns: TableColumn[] = [
    {
      title: "Nama",
      dataIndex: "title",
      sort: "title",
      width: "1rem",
    },
    {
      title: "Harga",
      dataIndex: "price",
      sort: "price",
      render: (data: any) => <>Rp. {data.price}</>,
      wrap: true,
    },
    {
      title: "Diskon",
      dataIndex: "discount",
      sort: "discount",
    },
    {
      title: "Aksi",
      dataIndex: "id",
      render: (data: any) => {
        return (
          <div className="flex gap-1">
            <Button
              type="button"
              color="outline-primary"
              size="sm"
              className="p-2"
              onClick={() => {
                dispatch(setID(data.id));
                navigate("show");
              }}
            >
              <FaEye />
            </Button>
            <Button
              type="button"
              color="outline-primary"
              size="sm"
              className="p-2"
              onClick={() => {
                dispatch(setID(data.id));
                navigate("edit");
              }}
            >
              <FaPen />
            </Button>
            <Button
              type="button"
              color="outline-primary"
              size="sm"
              className="p-2"
              onClick={() => handleConfirmDelete(data.id)}
            >
              <FaTrash />
            </Button>
          </div>
        );
      },
      wrap: true,
    },
  ];

  const handleConfirmDelete = (id: string) => {
    setVisible(true);
    setId(id);
    dispatch(setMessage(""));
  };

  const handleDelete = async () => {
    try {
      setLoadingButton(true);
      const response = await productService.deleteProduct(id);
      dispatch(setMessage(response.data.message));
      dispatch(delProduct(id));
      setLoadingButton(false);
      setVisible(false);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setVisible(false);
      setLoadingButton(false);
    }
  };

  return (
    <>
      <Alert type="success" hidden={message ? false : true}>
        {message}
      </Alert>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        className="p-6"
      >
        <div>
          <img
            src={Question}
            alt="question"
            className={`mx-auto transition-all duration-500 delay-100 h-28 ${
              visible ? "rotate-0" : "rotate-45"
            }`}
          />
        </div>
        <h1 className="mb-4 w-10/12 mx-auto text-center">
          Data yang sudah di hapus tidak data dikembalikan!
        </h1>
        <div className="flex justify-center gap-2">
          <Button
            type="button"
            color="primary"
            onClick={handleDelete}
            loading={loadingButton}
          >
            Hapus
          </Button>
          <Button
            type="button"
            color="secondary"
            onClick={() => setVisible(false)}
          >
            Batal
          </Button>
        </div>
      </Modal>
      <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center mb-4">
        <div className="font-medium text-2xl">Produk</div>
        <div className="text-xs md:text-sm">
          <Link to="/admin/dashboard" className="text-blue-700 me-1.5">
            Home
          </Link>
          / Produk
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <Alert type="success" hidden={!message ? true : false}>
          {message}
        </Alert>
        <Alert type="danger" hidden={!errorMessage ? true : false}>
          {errorMessage}
        </Alert>
        <Table
          data={products}
          columns={columns}
          pathAddData="create"
          search
          loading={loading}
        />
      </div>
    </>
  );
};

export default Product;
