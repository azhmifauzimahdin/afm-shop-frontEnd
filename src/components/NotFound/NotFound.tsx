import { FC } from "react";
import ProgressiveImg from "../Image/ProgressiveImg";
import { NotFound as imageNotFound } from "../../assets";
import { Button } from "..";

const NotFound: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ProgressiveImg src={imageNotFound} className="w-3/5" />
      <h1 className="text-center text-xl text-orange font-bold mb-10">
        HALAMAN TIDAK DITEMUKAN
      </h1>
      <Button type="button" color="outline-primary">
        Halaman Utama
      </Button>
    </div>
  );
};

export default NotFound;
