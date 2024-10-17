import { FC, ReactNode } from "react";

interface InputProps {
  label?: string;
  type: "search";
  id: string;
  name: string;
  prepend?: ReactNode;
  append?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  errorMessage?: any;
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
    value,
    onChange,
    errorMessage,
  } = props;

  return (
    <div className="grow">
      {label && (
        <label htmlFor={id} className="block mb-2 font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 ${
            prepend ? "ps-10" : "pe-10"
          }`}
        />
        {prepend ? (
          <div className="absolute start-3 bottom-2.5 text-slate-600">
            {prepend}
          </div>
        ) : (
          <div className="absolute end-3 bottom-2.5 text-slate-600">
            {append}
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="text-red-600 text-xs ml-3 mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default InputGroup;
