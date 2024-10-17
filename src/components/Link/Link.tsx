import React, { FC } from "react";
import { Link as ButtonLink } from "react-router-dom";

interface InputProps {
  to: string;
  children: React.ReactNode;
  clasName?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const Link: FC<InputProps> = (props) => {
  const { to, children, clasName, onClick } = props;
  return (
    <ButtonLink
      to={to}
      onClick={onClick}
      className={`text-orange hover:text-purple disabled:text-slate-500 ${clasName}`}
    >
      {children}
    </ButtonLink>
  );
};

export default Link;
