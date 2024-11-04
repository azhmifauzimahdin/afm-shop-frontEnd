import { FC } from "react";
import ReactLoading from "react-loading";
import { LogoFull } from "../../assets";

const LoadingScreen: FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <ReactLoading type="bubbles" color="#FF4C61" />
      <img src={LogoFull} alt="Logo afm" className="h-9 absolute bottom-8" />
    </div>
  );
};

export default LoadingScreen;
