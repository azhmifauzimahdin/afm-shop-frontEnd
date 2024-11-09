import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface InputProps {
  to?: string;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  active?: boolean;
  type?: "user" | "admin";
}

const NavLink: FC<InputProps> = (props) => {
  const {
    to = "",
    children,
    onClick,
    className,
    active,
    type = "user",
  } = props;
  const style =
    type === "user"
      ? `py-2 px-4 rounded-3xl cursor-pointer flex items-center gap-3 ${
          active ? "text-slate-100 bg-orange" : "hover:bg-slate-200"
        }`
      : `py-2 px-4 flex items-center gap-3 p-2 text-gray-900 rounded-3xl group ${
          active ? "text-slate-100 bg-orange" : "hover:bg-slate-200"
        }`;

  return (
    <Link to={to} onClick={onClick} className={`${style} ${className}`}>
      {children}
    </Link>
  );
};

export default NavLink;
