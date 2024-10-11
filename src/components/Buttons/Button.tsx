import { FC, ReactNode } from "react";
import ReactLoading from "react-loading";

interface InputProps {
  type: "submit" | "button";
  color: "primary" | "secondary" | "link" | "outline-primary";
  width?: "w-full";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
}
const Primary: FC<InputProps> = (props) => {
  const { type, color, width, children, disabled, onClick, loading } = props;
  const classColor =
    color === "primary"
      ? "bg-orange text-white hover:bg-purple"
      : color === "secondary"
      ? "bg-slate-400 text-white hover:bg-slate-500"
      : color == "outline-primary" &&
        "border border-orange text-orange hover:bg-orange hover:text-white";
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`relative ${
        color === "link"
          ? "text-orange disabled:text-slate-500"
          : "min-h-10 rounded-lg font-medium px-5 py-2.5 disabled:bg-slate-200 focus:outline-none focus:ring-4 group"
      } ${width} ${classColor} `}
    >
      {loading && disabled ? (
        <ReactLoading
          type="bubbles"
          color="#FF4C61"
          className="absolute inset-0 m-auto"
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Primary;
