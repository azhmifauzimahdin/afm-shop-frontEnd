import { FC } from "react";

interface InputProps {
  width: number;
}
const ProgressBar: FC<InputProps> = (props) => {
  const { width } = props;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-0.5">
      <div
        className="bg-orange h-2.5 rounded-full"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
