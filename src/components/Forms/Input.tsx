import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  label?: string;
  type: "text" | "password" | "email";
  id: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  errorMessage?: any;
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
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          id={id}
          name={name}
          value={value}
          className={`bg-gray-50 border rounded-lg border-gray-300rounded-lg focus:border-orange outline-none block w-full p-2.5 ${
            type === "password" && "pe-10"
          }`}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
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
      {errorMessage && (
        <div className="text-red-600 text-xs ml-3 mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default Input;
