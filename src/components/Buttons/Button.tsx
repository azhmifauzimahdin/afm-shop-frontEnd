import { FC, ReactNode } from "react";
import ReactLoading from "react-loading";

interface InputProps {
  type: "submit" | "button";
  color: "primary" | "secondary" | "outline-primary" | "link";
  width?: "w-full";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}
const Primary: FC<InputProps> = (props) => {
  const {
    type,
    color,
    width,
    children,
    disabled,
    onClick,
    loading,
    className,
  } = props;
  const classColor =
    color === "primary"
      ? "bg-orange text-white hover:bg-purple"
      : color === "secondary"
      ? "bg-slate-400 text-white hover:bg-slate-500"
      : color === "outline-primary"
      ? "border border-orange text-orange hover:bg-orange hover:text-white"
      : color === "link"
      ? "text-orange hover:text-purple disabled:text-slate-500"
      : "";
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`relative min-h-10 rounded-lg font-medium group ${
        color !== "link" ? "px-5 py-2.5 disabled:bg-slate-200 focus:outline-none focus:ring-4" : ""
      } ${width} ${classColor} ${className} `}
    >
      <span className={`${loading && disabled && "text-slate-200"}`}>
        {children}
      </span>
      {loading && disabled && (
        <ReactLoading
          type="bubbles"
          color="#FF4C61"
          className="absolute inset-0 m-auto large-box"
        />
      )}
    </button>
  );
};

export default Primary;
