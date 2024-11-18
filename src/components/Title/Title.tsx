import { FC, ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

interface InputProps {
  children: ReactNode;
  loadingRender?: boolean;
}

const Title: FC<InputProps> = (props) => {
  const { children, loadingRender } = props;
  return (
    <>
      {loadingRender ? (
        <Skeleton width={160} height={20} className="mb-4" />
      ) : (
        <h1 className="mb-4">{children}</h1>
      )}
    </>
  );
};

export default Title;
