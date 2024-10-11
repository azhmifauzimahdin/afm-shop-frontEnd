import { FC } from "react";
import ReactLoading from "react-loading";

const LoadingScreen: FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ReactLoading type="bubbles" color="#FF4C61" />
    </div>
  );
};

export default LoadingScreen;
