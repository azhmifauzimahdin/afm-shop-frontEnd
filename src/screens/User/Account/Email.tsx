import { FC, useState } from "react";
import { DocumentTitle } from "../../../layouts";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "../../../components";
import { userService } from "../../../services";
import { UserEmailRequest } from "../../../types/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/user";
import {
  addErrorMessage,
  setErrorMessage,
} from "../../../redux/actions/errorMessage";

interface FormValues {
  email: string;
}

const Email: FC = () => {
  DocumentTitle("Edit Email");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format tidak sesuai")
      .required("Email wajib diisi"),
  });

  const handleSubmit = async (values: FormValues) => {
    dispatch(setErrorMessage([]));
    try {
      setLoading(true);
      const response = await userService.updateEmail(
        values as UserEmailRequest
      );
      dispatch(updateUser(response.data.data));
      setLoading(false);
      navigate("/account/profile/verification-code");
    } catch (error: any) {
      dispatch(addErrorMessage(error.response.data.data?.email));
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
      <div className="border border-b-slate-200 border-t-0 border-x-0 pb-3 mb-4">
        <h1 className="section_title text-xl font-medium">Edit Email</h1>
        <p className="text-slate-500 text-sm">
          Kelola informasi profil Anda untuk mengontrol, melindungi dan
          mengamankan akun.
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-3 w-full md:w-2/3">
          <Input
            label="EMAIL"
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled={loading}
            errorMessage={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
          <div className="my-2">
            <Button type="submit" color="primary" disabled={loading}>
              BERIKUTNYA
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Email;
