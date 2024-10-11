import { FC, ReactNode } from "react";
import { useOutsideClick } from "../useOutsideClick";

interface ModalProps {
  visible: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = (props) => {
  const { children, visible, onClose } = props;
  const ref = useOutsideClick(onClose);

  return (
    <div
      className={`bg-slate-900/40 fixed top-0 right-0 w-screen h-screen transition-all duration-500 ${
        visible ? "opacity-100 z-10" : "opacity-0 -z-10"
      }`}
    >
      <div
        ref={ref}
        className={`bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-lg transition-all duration-500 shadow w-10/12 sm:w-auto ${
          visible ? "scale-100" : "scale-50"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
