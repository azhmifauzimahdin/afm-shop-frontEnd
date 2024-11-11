import { FC, useState } from "react";
import { DocumentTitle } from "../../../../layouts";
import { Alert, Button, Input, A } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "../../../../services";
import { LoginRequest } from "../../../../types/login";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { logoGoogle } from "../../../../assets/index";
import { updateMe } from "../../../../redux/actions/me";

interface FormValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  DocumentTitle("Login");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage]: any[] = useState([]);
  const navigate = useNavigate();
  const me = useSelector((state: any) => state.me.me);
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

      const response = await authService.login(values as LoginRequest);
      localStorage.setItem(
        "ACCESS_TOKEN",
        response.data.data.authorization.token
      );
      dispatch(updateMe(response.data.data.user));
      setLoading(false);
      navigate("/");
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
      email: me.email,
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        setLoading(true);
        const response = await authService.userGoogle(
          codeResponse.access_token
        );
        const responseLogin = await authService.loginGoogle(response.data);
        localStorage.setItem(
          "ACCESS_TOKEN",
          responseLogin.data.data.authorization.token
        );
        dispatch(updateMe(responseLogin.data.data.user));
        setLoading(false);
        navigate("/");
      } catch (error: any) {
        setErrorMessage([error.response.data.data.errors]);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-1">LOGIN</h1>
      <p className="mb-3 text-slate-500 text-center">
        Silakan login dan mulai beberlanja
      </p>
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
          <div className="flex justify-end">
            <A to="/forget-password">Lupa kata sandi?</A>
          </div>
          <div className="mt-3">
            <Button
              type="submit"
              color="primary"
              width="w-full"
              loading={loading}
            >
              LOGIN
            </Button>
          </div>
        </div>
      </form>
      <div className="text-slate-500 text-center text-sm my-3">Atau</div>
      <div className="flex justify-center">
        <Button type="button" color="outline-primary" onClick={() => login()}>
          <img
            src={logoGoogle}
            className="inline w-5 mr-2 group-hover:scale-125 transition-all duration-500"
            alt="Google"
          />
          <span className="font-medium text-sm">Google</span>
        </Button>
      </div>
    </>
  );
};

export default Login;
