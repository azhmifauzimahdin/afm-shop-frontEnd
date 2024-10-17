import { FC, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface InputProps {
  type: "danger" | "success";
  hidden: boolean;
  children: any;
  className?: string;
}
const Alert: FC<InputProps> = (props) => {
  const { type, children, hidden, className } = props;
  const [visible, setVisible] = useState<boolean>(!hidden);

  useEffect(() => {
    setVisible(!hidden);
  }, [hidden]);

  let color;
  switch (type) {
    case "danger":
      color = "text-red-900 bg-red-100";
      break;
    case "success":
      color = "text-green-900 bg-green-100";
  }

  return (
    <div
      className={`text-sm rounded-lg relative p-3 mb-3	${color} 
        ${visible ? "block" : "hidden"} ${className} `}
      role="alert"
    >
      <div className="overflow-hidden">
        {children}
        <FaXmark
          className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer ${
            !visible && "hidden"
          }`}
          onClick={() => setVisible(false)}
        />
      </div>
    </div>
  );
};

export default Alert;
