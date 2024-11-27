import { FC } from "react";
import { Chat as ChatType } from "../../types/chat";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

interface InputProps {
  data?: ChatType;
  type: "sender" | "recipient";
  date: boolean;
}

const Chat: FC<InputProps> = (props) => {
  const { data, type, date } = props;
  return (
    <>
      {!date ? (
        <div className="flex justify-center">
          <div className="bg-blue-200 py-1 px-3 rounded-full">{data?.date}</div>
        </div>
      ) : null}
      <div
        className={`flex ${
          type === "sender" ? "justify-end" : "justify-start"
        } m-2`}
      >
        <div
          className={`px-3 py-1 ${
            type === "sender"
              ? "bg-blue-200 rounded-tr-none"
              : "bg-white rounded-tl-none"
          } rounded-xl `}
        >
          <p>{data?.message}</p>
          <div className="text-[10px] flex gap-1 items-center justify-end">
            {type === "sender" ? (
              <IoCheckmarkDoneOutline
                className={`${data?.status === 1 ? "text-blue-600" : ""}`}
              />
            ) : null}
            <div>{data?.time}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
