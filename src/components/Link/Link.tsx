import React, { FC } from "react";
import { Link as ButtonLink } from "react-router-dom";

interface InputProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const Link: FC<InputProps> = (props) => {
  const { to, children, className, onClick } = props;
  return (
    <ButtonLink
      to={to}
      onClick={onClick}
      className={`text-orange hover:text-purple disabled:text-slate-500 ${className}`}
    >
      {children}
    </ButtonLink>
  );
};

export default Link;
