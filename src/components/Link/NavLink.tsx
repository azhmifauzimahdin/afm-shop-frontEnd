import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface InputProps {
  to: string;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  active?: boolean;
}

const NavLink: FC<InputProps> = (props) => {
  const { to, children, onClick, className, active } = props;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`hover:text-orange hover:cursor-pointer flex items-center gap-3 ${className} ${
        active && "text-orange"
      } `}
    >
      {children}
    </Link>
  );
};

export default NavLink;
