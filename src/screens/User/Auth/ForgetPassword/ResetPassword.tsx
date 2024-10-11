import { FC, useEffect, useState } from "react";
import { Button, Input, LoadingScreen } from "../../../../components";
import { DocumentTitle } from "../../../../layouts";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import YupPassword from "yup-password";
import { authService } from "../../../../services";
YupPassword(Yup);

interface FormValues {
  password: string;
  password_confirmation: string;
}

const ResetPassword: FC = () => {
  DocumentTitle("Reset kata sandi");
  const me = useSelector((state: any) => state.me.me);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!me.email) {
      navigate("/forget-password");
    }
    setRender(true);
  }, [me.email, navigate]);

  const validationSchema = Yup.object().shape({
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
      const request = { ...me, ...values };
      const response = await authService.resetPassword(request);
      localStorage.setItem(
        "ACCESS_TOKEN",
        response.data.data.authorization.token
      );
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  if (!render) {
    return <LoadingScreen />;
  }

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-1">Reset Kata Sandi</h1>
      <p className="mb-3 text-slate-500 text-center">
        Gunakan kata sandi yang kuat untuk menjaga keamanan akun Anda
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-3">
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
          <Input
            label="KONFIRMASI KATA SANDI"
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            placeholder="Masukan konfirmasi kata sandi"
            disabled={loading}
            errorMessage={
              formik.touched.password_confirmation &&
              formik.errors.password_confirmation
                ? formik.errors.password_confirmation
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
              UBAH KATA SANDI
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
