import { FC } from "react";
import { Outlet } from "react-router-dom";
import { UserNavbar } from "../../components";

const UserLayout: FC = () => {
  return (
    <>
      <div className="min-h-screen">
        <UserNavbar />
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserLayout;
