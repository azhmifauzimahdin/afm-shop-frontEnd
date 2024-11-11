import { FC, useEffect, useState } from "react";
import { Button, Input, LoadingScreen } from "../../../../components";
import { DocumentTitle } from "../../../../layouts";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import YupPassword from "yup-password";
import { authService } from "../../../../services";
import { updateMe } from "../../../../redux/actions/me";
YupPassword(Yup);

interface FormValues {
  name: string;
  password: string;
  password_confirmation: string;
}

const CreateAccount: FC = () => {
  DocumentTitle("Buat Akun");
  const me = useSelector((state: any) => state.me.me);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!me.email) {
      navigate("/register");
    }
    setRender(true);
  }, [me.email, navigate]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nama wajib diisi"),
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
      const response = await authService.createAccount(request);
      dispatch(updateMe(response.data.data.user));
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
      name: "",
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
      <h1 className="text-center text-2xl font-bold mb-1">Buat Akun</h1>
      <p className="mb-3 text-slate-500 text-center">
        Daftarkan diri anda dan mulai berbelanja
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-3">
          <Input
            label="NAMA"
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Masukan nama"
            disabled={loading}
            errorMessage={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
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
              loading={loading}
            >
              BUAT AKUN
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateAccount;
