import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

interface InputProps {
  label?: string;
  type:
    | "text"
    | "password"
    | "email"
    | "date"
    | "radio"
    | "search"
    | "number"
    | "file";
  size?: "sm" | "md";
  id: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  loadingRender?: boolean;
  value?: any;
  defaultValue?: string;
  onChange?: (e: any) => void;
  errorMessage?: any;
  checked?: boolean | undefined;
  width?: string;
}

const Input: FC<InputProps> = (props) => {
  const {
    label,
    type,
    size = "md",
    id,
    name,
    placeholder,
    disabled,
    loadingRender,
    value,
    onChange,
    errorMessage,
    checked,
    width,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const hideLabel =
    type !== "radio" ? (type !== "search" ? true : false) : false;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {loadingRender ? (
        <div className={`${width ? width : "w-full"}`}>
          {label ? (
            <Skeleton
              height={20}
              width={100}
              borderRadius={24}
              className="mb-2"
            />
          ) : null}
          <Skeleton borderRadius={24} height={36} />
        </div>
      ) : (
        <div className={`${type === "radio" ? "flex item" : ""} ${width}`}>
          {hideLabel ? (
            <label htmlFor={id} className="block mb-2 font-medium">
              {label}
            </label>
          ) : null}
          <div
            className={`relative ${
              type === "radio" && "flex flex-row justify-center"
            }`}
          >
            <input
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              id={id}
              name={name}
              value={value}
              className={`bg-gray-50 rounded-3xl px-4 border ${
                errorMessage ? "shadow-sm shadow-orange/30" : "border-gray-300"
              } ${size === "sm" ? "p-2" : "p-2.5"} ${
                type !== "radio" && "w-full"
              } ${type === "password" && "pe-10"} disabled:bg-slate-100`}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChange}
              defaultChecked={checked}
            />
            {type === "password" && (
              <div
                className="absolute end-3 bottom-2.5 cursor-pointer text-slate-600 text-lg "
                onClick={handleClickShowPassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            )}
          </div>
          {type === "radio" && (
            <label htmlFor={id} className="ms-2">
              {label}
            </label>
          )}
          {errorMessage && (
            <div className="text-red-600 text-xs ml-3 mt-1">{errorMessage}</div>
          )}
        </div>
      )}
    </>
  );
};

export default Input;
