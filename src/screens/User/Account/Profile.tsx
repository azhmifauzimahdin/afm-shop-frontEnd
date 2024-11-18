import { FC, useState } from "react";
import { DocumentTitle } from "../../../layouts";
import { useFormik } from "formik";
import * as Yup from "yup";
import { A, Alert, Button, Input } from "../../../components";
import { userService } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { defaultUser } from "../../../assets";
import { updateMe } from "../../../redux/actions/me";
import { me } from "../../../types/user";

interface FormValues {
  name: string;
  gender: string;
  birthday: string;
  image: any;
}

const Profile: FC = () => {
  DocumentTitle("Profil Saya");
  const me: me = useSelector((state: any) => state.me.me);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPreview(e.target.files[0]);
    formik.setFieldValue("image", e.target.files[0]);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nama wajib diisi"),
    image: Yup.mixed()
      .test(
        "fileSize",
        "Masksimal ukuran file 1 MB",
        (file: any) => !file?.size || file?.size <= 1000000
      )
      .test("fileFormat", "Format gambar: JPG, JPEG, PNG", (file: any) => {
        const FormatSupported = ["image/jpg", "image/jpeg", "image/png"];
        return !file?.type || FormatSupported.includes(file?.type);
      }),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setMessage("");
      setLoading(true);
      const formData = {
        ...values,
        _method: "put",
      };
      const response = await userService.updateUser(formData as any);
      dispatch(updateMe(response.data.data.user));
      setMessage(response.data.message);

      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: me.name,
      gender: me.gender,
      birthday: me?.birthday || "",
      image: undefined,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="border border-b-slate-200 border-t-0 border-x-0 pb-3 mb-4">
        <h1 className="section_title text-xl font-medium">Profil Saya</h1>
        <p className="text-slate-500 text-sm">
          Kelola informasi profil Anda untuk mengontrol, melindungi dan
          mengamankan akun.
        </p>
      </div>
      <Alert type="success" hidden={message ? false : true}>
        {message}
      </Alert>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <div className="grid md:grid-cols-3 pb-3">
          <div className="md:col-span-2 grid gap-3 order-3">
            <Input
              label="NAMA"
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              disabled={loading}
              errorMessage={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ""
              }
            />
            <div>
              <h2 className="block mb-2 font-medium">EMAIL</h2>
              <div className="text-sm mb-1">
                {me.email}
                <A to="email" className="ms-2">
                  Ubah
                </A>
              </div>
            </div>
            <div>
              <h2 className="block mb-2 font-medium">JENIS KELAMIN</h2>
              <div className="flex gap-5">
                <Input
                  label="Laki-laki"
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={formik.handleChange}
                  checked={me.gender === "male" ? true : false}
                />
                <Input
                  label="Perempuan"
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={formik.handleChange}
                  checked={me.gender === "female" ? true : false}
                />
              </div>
            </div>
            <Input
              label="TANGGAL LAHIR"
              type="date"
              id="birthday"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
              disabled={loading}
              errorMessage={
                formik.touched.birthday && formik.errors.birthday
                  ? formik.errors.birthday
                  : ""
              }
            />
            <div className="mt-2">
              <Button type="submit" color="primary" disabled={loading}>
                Simpan
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 self-start pt-11 order-2 md:order-3 mb-5">
            <div className="w-1/3 aspect-square rounded-full overflow-hidden">
              {me.image_url ? (
                <img
                  src={
                    preview === null
                      ? me.image_url
                      : URL.createObjectURL(preview)
                  }
                  className="w-full"
                  id="image_preview"
                  alt="User Image"
                />
              ) : (
                <img
                  src={
                    preview === null
                      ? defaultUser
                      : URL.createObjectURL(preview)
                  }
                  className="w-full"
                  id="image_preview"
                  alt="User Image"
                />
              )}
            </div>
            <div>
              <label htmlFor="image">
                <div className="bg-white rounded-lg hover:bg-gray-300 focus:ring-4 font-medium text-sm px-5 py-2.5 focus:outline-none transition border border-gray-700 text-center cursor-pointer">
                  Pilih Gambar
                </div>
                <input
                  className="hidden"
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
            </div>
            <div className="text-xs text-slate-400 text-center">
              <div>Ukuran gambar: maks. 1 MB</div>
              <div>Format gambar: JPG, JPEG, PNG</div>
            </div>
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-600 text-xs ml-2 mt-1">
                {formik.errors.image}
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;
