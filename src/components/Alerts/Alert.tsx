import { FC, ReactNode } from "react";

interface InputProps {
  type: "danger" | "success";
  hidden: boolean;
  children: ReactNode;
  className?: string;
}
const Alert: FC<InputProps> = (props) => {
  const { type, children, hidden, className } = props;

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
      className={`p-3 mb-4 text-sm rounded-lg ${color} 
        ${hidden ? "hidden" : ""} ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
};

export default Alert;
