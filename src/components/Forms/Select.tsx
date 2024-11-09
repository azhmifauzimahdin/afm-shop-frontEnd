import { FC } from "react";

interface dataSelect {
  value: any;
  label: string;
}

interface InputProps {
  id: string;
  name: string;
  data: dataSelect[];
  onChange: any;
}

const Select: FC<InputProps> = (props) => {
  const { id, name, data, onChange } = props;
  return (
    <select
      id={id}
      name={name}
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl block w-full p-2.5"
    >
      {data
        ? data.map((data, index) => (
            <option key={index} value={data.value}>
              {data.label}
            </option>
          ))
        : null}
    </select>
  );
};

export default Select;
