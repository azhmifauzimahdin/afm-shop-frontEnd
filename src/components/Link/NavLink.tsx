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
      ? `hover:text-orange cursor-pointer flex items-center gap-3 ${
          active && "text-orange"
        }`
      : `flex items-center gap-3 p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:text-orange group ${
          active && "text-orange bg-gray-100"
        }`;

  return (
    <Link to={to} onClick={onClick} className={`${style} ${className}`}>
      {children}
    </Link>
  );
};

export default NavLink;
