import { FC, useState } from "react";
import { DocumentTitle } from "../../../../layouts";
import { Alert, Button, Input } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authAdminService } from "../../../../services";
import { LoginRequest } from "../../../../types/login";
import { useDispatch } from "react-redux";
import { updateAdmin } from "../../../../redux/actions/admin";

interface FormValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  DocumentTitle("Login Admin");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage]: any[] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    setErrorMessage([]);
    formik.handleSubmit();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format tidak sesuai")
      .required("Email wajib diisi"),
    password: Yup.string().required("Kata sandi wajib diisi"),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      const response = await authAdminService.login(values as LoginRequest);
      localStorage.setItem(
        "ACCESS_TOKEN",
        response.data.data.authorization.token
      );
      dispatch(updateAdmin(response.data.data.user));
      setLoading(false);
      navigate("/admin/dashboard");
    } catch (error: any) {
      setErrorMessage([error.response.data.data?.errors]);
      setErrorMessage((errorMessage: any) => [
        ...errorMessage,
        error.response.data.data?.email,
      ]);
      setErrorMessage((errorMessage: any) => [
        ...errorMessage,
        error.response.data.data?.password,
      ]);
      setLoading(false);
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-3">LOGIN ADMIN</h1>
      <Alert type="danger" hidden={errorMessage.length > 0 ? false : true}>
        {errorMessage}
      </Alert>
      <form onSubmit={handleSubmitForm}>
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

          <Input
            label="KATA SANDI"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Masukan kata sandi"
            disabled={loading}
            errorMessage={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
          />
          <div className="mt-3">
            <Button
              type="submit"
              color="primary"
              width="w-full"
              disabled={loading}
              loading
            >
              LOGIN
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
