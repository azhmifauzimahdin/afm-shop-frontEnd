import { FC, ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

interface InputProps {
  label?: string;
  type: "search" | "number";
  id: string;
  name: string;
  prepend?: ReactNode;
  append?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  loadingRender?: boolean;
  value?: string | number;
  defaultValue?: any;
  onChange?: (e: any) => void;
  errorMessage?: any;
  width?: string;
  inputStyle?: string;
}

const InputGroup: FC<InputProps> = (props) => {
  const {
    label,
    type,
    id,
    name,
    prepend,
    append,
    placeholder,
    disabled,
    loadingRender,
    value,
    defaultValue,
    onChange,
    errorMessage,
    width,
    inputStyle,
  } = props;

  return (
    <>
      {loadingRender ? (
        <div className={`grow`}>
          {label ? <Skeleton height={20} width={100} className="mb-2" /> : null}
          {width ? (
            <Skeleton height={36} width={width} borderRadius={24} />
          ) : (
            <Skeleton height={36} borderRadius={24} />
          )}
        </div>
      ) : (
        <div className={`grow`}>
          {label && (
            <label htmlFor={id} className="block mb-2 font-medium">
              {label}
            </label>
          )}
          <div className={`relative ${width}`}>
            <input
              type={type}
              name={name}
              id={id}
              placeholder={placeholder}
              disabled={disabled}
              value={value}
              defaultValue={defaultValue}
              onChange={onChange}
              className={`px-3 disabled:bg-slate-100 bg-gray-50 border ${
                errorMessage ? "border-orange" : "border-gray-300"
              } rounded-3xl w-full p-2.5 ${prepend ? "ps-10" : ""} ${
                append ? "pe-10" : ""
              } ${inputStyle ? inputStyle : ""}`}
            />
            {prepend ? (
              <div className="absolute start-3 top-1/3 text-slate-600">
                {prepend}
              </div>
            ) : null}
            {append ? (
              <div className="absolute end-3 top-1/3 text-slate-600">
                {append}
              </div>
            ) : null}
          </div>
          {errorMessage && (
            <div className="text-red-600 text-xs ml-3 mt-1">{errorMessage}</div>
          )}
        </div>
      )}
    </>
  );
};

export default InputGroup;
