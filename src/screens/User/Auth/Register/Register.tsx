import { FC, useState } from "react";
import { DocumentTitle } from "../../../../layouts";
import { Alert, Button, Input, Modal } from "../../../../components";
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

const Register: FC = () => {
  DocumentTitle("Registrasi");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [hiddenAlert, setHiddenAlert] = useState(true);
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
      const response = await authService.register(values);
      dispatch(updateMe(response.data.data));
      setLoading(false);
      navigate("/register/verification-code");
    } catch (error: any) {
      dispatch(updateMe(values));
      setErrorMessage(error.response.data.data.email);
      if (
        error.response.data.data.email[0] !=
        "Email harus berupa alamat email yang valid."
      ) {
        setVisible(true);
      } else {
        setHiddenAlert(false);
      }
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
      <h1 className="text-center text-2xl font-bold mb-1">Register</h1>
      <Alert type="danger" hidden={hiddenAlert}>
        {errorMessage}
      </Alert>
      <p className="mb-3 text-slate-500 text-center">
        Daftarkan diri anda dan mulai berbelanja
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
              loading={loading}
            >
              BERIKUTNYA
            </Button>
          </div>
        </div>
      </form>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <div className="text-center py-3 px-5">
          <h1 className="font-medium text-lg mb-2">{errorMessage}</h1>
          <div className="mb-6">Silakan login dengan akun Anda.</div>
          <div className="flex justify-center gap-2">
            <Button
              type="button"
              color="secondary"
              onClick={() => setVisible(false)}
            >
              UBAH
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Register;
