import { FC, ReactNode } from "react";
import ReactLoading from "react-loading";
import Skeleton from "react-loading-skeleton";

interface InputProps {
  type: "submit" | "button";
  color: "primary" | "secondary" | "outline-primary" | "link";
  size?: "sm" | "md";
  width?: "w-full";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loadingRender?: boolean;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}
const Primary: FC<InputProps> = (props) => {
  const {
    type,
    color,
    size = "md",
    width,
    children,
    disabled,
    loadingRender,
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
    <>
      {loadingRender ? (
        <div>
          {width ? (
            <Skeleton height={36} borderRadius={24} />
          ) : (
            <Skeleton height={36} width={100} borderRadius={24} />
          )}
        </div>
      ) : (
        <button
          type={type}
          disabled={disabled || loading}
          onClick={onClick}
          className={`relative rounded-3xl font-medium group ${
            color !== "link"
              ? `${
                  size === "sm" ? "px-2 py-1 text-sm" : "px-5 py-2.5"
                } shadow disabled:bg-slate-200 focus:outline-none focus:ring-4`
              : ""
          } ${width} ${classColor} ${className} `}
        >
          <span
            className={`${
              loading || (color === "link" && disabled) ? "text-slate-200" : ""
            }`}
          >
            {children}
          </span>
          {loading ? (
            <ReactLoading
              type="bubbles"
              color="#FF4C61"
              className="absolute inset-0 m-auto large-box"
            />
          ) : null}
        </button>
      )}
    </>
  );
};

export default Primary;
