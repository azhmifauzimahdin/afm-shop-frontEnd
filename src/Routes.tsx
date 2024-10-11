import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CreateAccount,
  ForgetPassword,
  Login,
  Register,
  ResetPassword,
  VerificationCode,
  VerificationCodeForgetPassword,
} from "./screens/User";
import { AuthLayout, UserLayout } from "./layouts";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/register/verification-code"
            element={<VerificationCode />}
          />
          <Route path="/register/create-account" element={<CreateAccount />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/forget-password/verification-code"
            element={<VerificationCodeForgetPassword />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/" element={<UserLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
