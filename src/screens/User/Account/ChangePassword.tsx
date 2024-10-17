import { FC, useState } from "react";
import { DocumentTitle } from "../../../layouts";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Button, Input } from "../../../components";
import { userService } from "../../../services";
import { ChangePasswordRequest } from "../../../types/user";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/user";
import YupPassword from "yup-password";
YupPassword(Yup);

interface FormValues {
  old_password: string;
  password: string;
  password_confirmation: string;
}

const ChangePassword: FC = () => {
  DocumentTitle("Ganti Kata Sandi");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage]: any[] = useState([]);
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
    try {
      setLoading(true);
      const response = await userService.changePassword(
        values as ChangePasswordRequest
      );
      dispatch(updateUser(response.data.data));
      setMessage(response.data.message);
      setLoading(false);
    } catch (error: any) {
      console.log(error);

      setErrorMessage([error.response.data.data?.errors]);
      setErrorMessage((errorMessage: any) => [
        ...errorMessage,
        error.response.data.data?.old_password,
      ]);
      setErrorMessage((errorMessage: any) => [
        ...errorMessage,
        error.response.data.data?.password,
      ]);
      setErrorMessage((errorMessage: any) => [
        ...errorMessage,
        error.response.data.data?.password_confirmation,
      ]);
      setLoading(false);
    }
    formik.resetForm();
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
      <div className="border border-b-slate-200 border-t-0 border-x-0 pb-3 mb-4">
        <h1 className="section_title text-xl font-medium">Ganti Kata Sandi</h1>
        <p className="text-slate-500 text-sm">
          Kelola informasi profil Anda untuk mengontrol, melindungi dan
          mengamankan akun.
        </p>
      </div>
      <Alert type="success" hidden={message ? false : true}>
        {message}
      </Alert>
      <Alert type="danger" hidden={errorMessage.length > 0 ? false : true}>
        {errorMessage}
      </Alert>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-3 w-full md:w-2/3">
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
    </>
  );
};

export default ChangePassword;
