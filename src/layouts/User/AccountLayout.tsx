import { FC } from "react";
import { UserSidebar } from "../../components";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const AccountLayout: FC = () => {
  const me = useSelector((state: any) => state.me.me);
  return (
    <div className="flex items-start gap-2">
      <div className="p-3 md:grow-0 hidden md:block">
        <UserSidebar me={me} />
      </div>
      <div className="grow bg-white rounded-3xl md:shadow p-3 md:p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
