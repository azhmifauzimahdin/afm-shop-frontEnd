import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OtpInput } from "reactjs-otp-input";
import { DocumentTitle } from "../../../layouts";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../services";
import { UserEmailRequest, UserVerificationRequest } from "../../../types/user";
import { updateMe } from "../../../redux/actions/me";
import { Alert, Button, LoadingScreen } from "../../../components";

const VerificationCode: FC = () => {
  DocumentTitle("Verikasi kode");
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError]: any[] = useState([]);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    if (!user.email) {
      navigate("/account/profile/email");
    }
    setRender(true);
  }, [user.email, navigate]);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  const handleChange = (e: any) => {
    setOtp(e);
    if (e.length >= 6) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      const request = {
        email: user.email,
        otp: e,
      };
      const response = await userService.otpVerification(
        request as UserVerificationRequest
      );
      dispatch(updateMe(response.data.data.user));
      setLoading(false);
      navigate("/account/profile");
    } catch (error: any) {
      setMessage("");
      setMessageError([error.response.data.data.otp]);
      setMessageError((messageError: any) => [
        ...messageError,
        error.response.data.data.email,
      ]);
      setLoading(false);
      setOtp("");
    }
  };

  const handleSubmitResending = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await userService.resendOtp(
        user.email as UserEmailRequest
      );
      setMessageError("");
      setMessage(response.data.message);
      setLoading(false);
      setCounter(30);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (!render) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center p-3">
      <div className="bg-white rounded-lg shadow-md px-5 py-8 w-full sm:w-96">
        <h1 className="text-center text-2xl font-bold mb-1">
          Masukan Kode Verifikasi
        </h1>
        <Alert
          type="danger"
          hidden={messageError.length > 0 ? false : true}
          className="text-center my-3"
        >
          {messageError}
        </Alert>
        <Alert
          type="success"
          hidden={message ? false : true}
          className="text-center my-3"
        >
          {message} ke <span className="font-medium">{user.email}</span>
        </Alert>
        <p className="mb-3 text-slate-600 text-center">
          Kode verifikasi telah dikirim melalui E-mail ke{" "}
          <span className="font-bold">{user.email}</span>
        </p>
        <form>
          <div className="flex justify-center mt-6">
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={6}
              separator={<span style={{ width: "8px" }}></span>}
              inputStyle={{
                width: "45px",
                height: "54px",
                fontSize: "1.4rem",
                border: "1px solid #FF4C61",
                borderRadius: "4px",
                fontWeight: "400",
              }}
              disabledStyle={{
                border: "1px solid #C2C2C2",
              }}
              isDisabled={loading}
            />
          </div>
        </form>
        <form onSubmit={handleSubmitResending}>
          <div className="text-center text-slate-500 text-sm mt-4">
            {counter !== 0 ? (
              <>
                Mohon tunggu dalam{" "}
                <span className="font-medium">{counter} detik</span> untuk kirim
                ulang
              </>
            ) : (
              <>
                <span className="me-1">Tidak menerima kode?</span>
                <Button type="submit" color="link" disabled={loading}>
                  Kirim Ulang
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationCode;
