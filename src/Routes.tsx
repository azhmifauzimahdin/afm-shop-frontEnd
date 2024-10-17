import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ChangePassword,
  CreateAccount,
  Email,
  ForgetPassword,
  Home,
  Login,
  Profile,
  Register,
  ResetPassword,
  VerificationCode,
  VerificationCodeChangeEmail,
  VerificationCodeForgetPassword,
} from "./screens/User";
import { AccoutLayout, AuthLayout, UserLayout } from "./layouts";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

const Router: FC = () => {
  const me = useSelector((state: any) => state.me.me);

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
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute isAuthenticated={me.email} />}>
            <Route element={<AccoutLayout />}>
              <Route path="/account/profile" element={<Profile />}/>
              <Route path="/account/profile/email" element={<Email />}/>
              <Route path="/account/change-password" element={<ChangePassword />} />
            </Route>
          </Route>
        </Route>
        <Route
          path="/account/profile/verification-code"
          element={<VerificationCodeChangeEmail />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
