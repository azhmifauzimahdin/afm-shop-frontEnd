import { FC } from "react";
import Select from "react-select";

interface InputProps {
  data: any[];
}

const SelectSearch: FC<InputProps> = (props) => {
  const { data } = props;

  return <Select options={data} />;
};

export default SelectSearch;
