import { FC, useState } from "react";
import { DocumentTitle } from "../../../../layouts";
import { Alert, Button, Input } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);
import { authService } from "../../../../services";
import { useDispatch } from "react-redux";
import { updateMe } from "../../../../redux/actions/me";

interface FormValues {
  email: string;
}

const ForgetPassword: FC = () => {
  DocumentTitle("Registrasi");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format tidak sesuai")
      .required("Email wajib diisi"),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const response = await authService.forgetPassword(values);
      dispatch(updateMe(response.data.data));
      setLoading(false);
      navigate("/forget-password/verification-code");
    } catch (error: any) {
      console.log(error);
      dispatch(updateMe(values));
      setErrorMessage(error.response.data.data.email);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-1">
        Atur Ulang Kata Sandi
      </h1>
      <Alert
        type="danger"
        hidden={errorMessage ? false : true}
        className="text-center my-3"
      >
        {errorMessage}
      </Alert>
      <p className="mb-3 text-slate-500 text-center">
        Masukkan e-mail yang terdaftar. Kami akan mengirimkan kode verifikasi
        untuk atur ulang kata sandi.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-3">
          <Input
            label="EMAIL"
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Masukan email"
            disabled={loading}
            errorMessage={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
          <div className="mt-4">
            <Button
              type="submit"
              color="primary"
              width="w-full"
              disabled={loading}
              loading
            >
              BERIKUTNYA
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgetPassword;
