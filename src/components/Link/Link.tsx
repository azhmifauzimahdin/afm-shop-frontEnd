import React, { FC } from "react";
import { Link as ButtonLink } from "react-router-dom";

interface InputProps {
  to: string;
  type?: "link" | "button";
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const Link: FC<InputProps> = (props) => {
  const { to, type = "link", children, className, onClick } = props;
  return (
    <ButtonLink
      to={to}
      onClick={onClick}
      className={`text-orange disabled:text-slate-500 transition-all ${
        type === "button"
          ? "border p-2 border-orange rounded-3xl hover:bg-orange hover:text-white"
          : "hover:text-purple"
      } ${className}`}
    >
      {children}
    </ButtonLink>
  );
};

export default Link;
