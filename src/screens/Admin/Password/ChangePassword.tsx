import { FC, useState } from "react";
import { Button, Input } from "../../../components";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { adminService } from "../../../services";
import { ChangePasswordRequest } from "../../../types/user";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../redux/actions/message";
import {
  addErrorMessage,
  setErrorMessage,
} from "../../../redux/actions/errorMessage";
YupPassword(Yup);

interface FormValues {
  old_password: string;
  password: string;
  password_confirmation: string;
}

const ChangePassword: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    old_password: Yup.string().required("Kata sandi lama wajib diisi"),
    password: Yup.string()
      .min(6, "Kata sandi minimal berisi 6 karakter.")
      .minLowercase(1, "Kata sandi harus berisi setidaknya satu huruf kecil")
      .minUppercase(1, "Kata sandi harus berisi setidaknya satu huruf besar")
      .minNumbers(1, "Kata sandi harus berisi setidaknya satu angka.")
      .minSymbols(1, "Kata sandi harus berisi setidaknya satu simbol")
      .required("Kata sandi wajib diisi"),
    password_confirmation: Yup.string()
      .required("Konfirmasi kata sandi wajib diisi")
      .oneOf([Yup.ref("password")], "Konfirmasi kata sandi tidak cocok"),
  });

  const handleSubmit = async (values: FormValues) => {
    dispatch(setMessage(""));
    dispatch(setErrorMessage([]));
    try {
      setLoading(true);
      const response = await adminService.changePassword(
        values as ChangePasswordRequest
      );
      dispatch(setMessage(response.data.message));
      setLoading(false);
      formik.resetForm();
    } catch (error: any) {
      dispatch(setErrorMessage([error.response.data.data?.errors]));
      dispatch(addErrorMessage(error.response.data.data?.old_password));
      dispatch(addErrorMessage(error.response.data.data?.password));
      dispatch(
        addErrorMessage(error.response.data.data?.password_confirmation)
      );
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center mb-4">
        <div className="font-medium text-2xl">Ganti Kata Sandi</div>
        <div className="text-xs md:text-sm">
          <Link to="/admin/dashboard" className="text-blue-700 me-1.5">
            Home
          </Link>
          <span className="me-1.5">/</span>
          Ganti Kata Sandi
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-3 w-full md:w-6/12">
            <Input
              label="Kata Sandi Lama"
              type="password"
              id="old_password"
              name="old_password"
              value={formik.values.old_password}
              onChange={formik.handleChange}
              disabled={loading}
              errorMessage={
                formik.touched.old_password && formik.errors.old_password
                  ? formik.errors.old_password
                  : ""
              }
            />
            <Input
              label="Kata Sandi Baru"
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              disabled={loading}
              errorMessage={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
            />
            <Input
              label="Konfirmasi Kata Sandi"
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              disabled={loading}
              errorMessage={
                formik.touched.password_confirmation &&
                formik.errors.password_confirmation
                  ? formik.errors.password_confirmation
                  : ""
              }
            />
            <div className="my-2">
              <Button type="submit" color="primary" disabled={loading}>
                SIMPAN
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
