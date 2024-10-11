import { FC, useState } from "react";
import { DocumentTitle } from "../../../../layouts";
import { Alert, Button, Input } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "../../../../services";
import { LoginRequest } from "../../../../types/login";
import { useSelector } from "react-redux";

interface FormValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  DocumentTitle("Login");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const me = useSelector((state: any) => state.me.me);

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    setErrorMessage("");
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

      const response = await authService.login(values as LoginRequest);
      localStorage.setItem(
        "ACCESS_TOKEN",
        response.data.data.authorization.token
      );
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.response.data.data.errors);
      setLoading(false);
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      email: me.email,
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-1">LOGIN</h1>
      <p className="mb-3 text-slate-500 text-center">
        Silakan login dan mulai beberlanja
      </p>
      <Alert type="danger" hidden={errorMessage ? false : true}>
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
          <div className="flex justify-end">
            <Link to={"/forget-password"}>
              <Button type="button" color="link">
                Lupa kata sandi?
              </Button>
            </Link>
          </div>
          <div className="mt-3">
            <Button
              type="submit"
              color="primary"
              width="w-full"
              disabled={loading}
              loading
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
