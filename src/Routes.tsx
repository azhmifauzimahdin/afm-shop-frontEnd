import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ChangePassword as ChangePasswordUser,
  CreateAccount,
  Email,
  ForgetPassword,
  Home,
  Login,
  Profile,
  Register,
  ResetPassword,
  ShowProduct,
  VerificationCode,
  VerificationCodeChangeEmail,
  VerificationCodeForgetPassword,
} from "./screens/User";
import { AccoutLayout, AdminLayout, AuthLayout, UserLayout } from "./layouts";
import { useSelector } from "react-redux";
import {
  Admin,
  AuthenticateAdmin,
  AuthenticateUser,
  RedirectIfAuthenticatedAdmin,
  RedirectIfAuthenticatedUser,
  User,
} from "./ProtectedRoute";
import {
  AdminLogin,
  ChangePassword,
  CreateProduct,
  EditProduct,
  Product,
  ShowProduct as ShowProductAdmin,
} from "./screens/Admin";

const Router: FC = () => {
  const me = useSelector((state: any) => state.me.me);
  const isAuthenticateUser = me.email && me.name;
  const admin = useSelector((state: any) => state.admin.admin);
  const isAuthenticateAdmin = admin.email;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<User />}>
          <Route
            element={
              <RedirectIfAuthenticatedUser
                isAuthenticated={isAuthenticateUser}
              />
            }
          >
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/register/verification-code"
                element={<VerificationCode />}
              />
              <Route
                path="/register/create-account"
                element={<CreateAccount />}
              />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route
                path="/forget-password/verification-code"
                element={<VerificationCodeForgetPassword />}
              />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
          </Route>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:idProduct" element={<ShowProduct />} />
            <Route
              element={
                <AuthenticateUser isAuthenticated={isAuthenticateUser} />
              }
            >
              <Route element={<AccoutLayout />}>
                <Route path="/account/profile" element={<Profile />} />
                <Route path="/account/profile/email" element={<Email />} />
                <Route
                  path="/account/change-password"
                  element={<ChangePasswordUser />}
                />
              </Route>
            </Route>
          </Route>
          <Route
            path="/account/profile/verification-code"
            element={<VerificationCodeChangeEmail />}
          />
        </Route>

        <Route element={<Admin />}>
          <Route
            element={
              <RedirectIfAuthenticatedAdmin
                isAuthenticated={isAuthenticateAdmin}
              />
            }
          >
            <Route element={<AuthLayout />}>
              <Route path="/admin/login" element={<AdminLogin />} />
            </Route>
          </Route>
          <Route
            element={
              <AuthenticateAdmin isAuthenticated={isAuthenticateAdmin} />
            }
          >
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<div>Dashboard</div>} />
              <Route path="/admin/products" element={<Product />} />
              <Route
                path="/admin/products/create"
                element={<CreateProduct />}
              />
              <Route path="/admin/products/edit" element={<EditProduct />} />
              <Route
                path="/admin/products/show"
                element={<ShowProductAdmin />}
              />
              <Route
                path="/admin/change-password"
                element={<ChangePassword />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
