import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  label?: string;
  type: "text" | "password" | "email" | "date" | "radio";
  id: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  value?: any;
  defaultValue?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  errorMessage?: any;
  checked?: boolean | undefined;
}

const Input: FC<InputProps> = (props) => {
  const {
    label,
    type,
    id,
    name,
    placeholder,
    disabled,
    value,
    onChange,
    errorMessage,
    checked,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${type === "radio" && "flex item"}`}>
      {type !== "radio" && (
        <label htmlFor={id} className="block mb-2 font-medium">
          {label}
        </label>
      )}
      <div
        className={`relative ${
          type === "radio" && "flex flex-row justify-center"
        }`}
      >
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          id={id}
          name={name}
          value={value}
          className={`temp bg-gray-50 rounded-lg border border-gray-300 p-2.5 ${
            type !== "radio" && "w-full"
          } ${type === "password" && "pe-10"}`}
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
  );
};

export default Input;
