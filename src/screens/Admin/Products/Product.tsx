import { FC, useEffect, useState } from "react";
import { A, Alert, Button, Input, Modal, Table } from "../../../components";
import { productService } from "../../../services";
import { Question } from "../../../assets";
import { TableColumn } from "../../../components/Table/Table";
import { FaEye, FaPen, FaTrash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { delProduct, setProduct } from "../../../redux/actions/product";
import { DocumentTitle } from "../../../layouts";
import { setMessage } from "../../../redux/actions/message";
import { setID } from "../../../redux/actions/id";

const Product: FC = () => {
  DocumentTitle("Produk");
  const products = useSelector((state: any) => state.products.products);
  const message = useSelector((state: any) => state.message.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      getAllProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const getAllProducts = async (page = 1, perPage = 4) => {
    try {
      setLoading(true);
      const response = await productService.getAll(page, perPage, search);
      dispatch(setProduct(response.data.data.products));
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      render: (data) => <>Rp. {data.price}</>,
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
            <A to={`/admin/products/${data.id}`} type="button">
              <FaEye />
            </A>
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

  const handlePagination = (e: any) => {
    getAllProducts(e.selected + 1);
  };

  const handleConfirmDelete = (id: string) => {
    setVisible(true);
    setId(id);
    dispatch(setMessage(""));
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await productService.deleteProduct(id);
      dispatch(setMessage(response.data.message));
      dispatch(delProduct(id));
      setVisible(false);
      setLoading(false);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setLoading(false);
      setVisible(false);
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
            loading={loading}
            disabled={loading}
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
      <div className="bg-white rounded shadow p-4">
        <Alert type="success" hidden={!message ? true : false}>
          {message}
        </Alert>
        <Alert type="danger" hidden={!errorMessage ? true : false}>
          {errorMessage}
        </Alert>
        <div className="flex justify-between mb-3">
          <div>
            <Button
              type="button"
              color="primary"
              className="px-3"
              onClick={() => navigate("create")}
            >
              Tambah Data
            </Button>
          </div>
          <Input
            type="search"
            id="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari"
          />
        </div>
        <Table
          data={products}
          columns={columns}
          handlePagination={handlePagination}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Product;
