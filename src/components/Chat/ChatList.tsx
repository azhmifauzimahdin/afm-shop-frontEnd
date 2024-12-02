import { FC } from "react";
import { Message } from "../../types/chat";
import ProgressiveImg from "../Image/ProgressiveImg";

interface InputProps {
  data: Message;
  role: "admin" | "user";
  onClick: () => any;
}
const ChatList: FC<InputProps> = (props) => {
  const { data, role, onClick } = props;
  const readChat = role === "user" ? data.read_user : data.read_admin;
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg cursor-pointer overflow-hidden hover:bg-slate-100"
    >
      <div>
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <ProgressiveImg
            src={role === "user" ? data.admin.image_url : data.user.image_url}
            className="w-full"
            alt="User image"
          />
        </div>
      </div>
      <div className="grow flex flex-col justify-center py-2 pe-2 border-b h-full">
        <div className="flex justify-between items-center">
          <h1 className="font-medium truncate">
            {role === "user" ? data.admin.name : data.user.name}
          </h1>
          <div className="text-[10px] text-slate-600">
            {data.messages[data.messages.length - 1].time}
          </div>
        </div>
        <div className="flex justify-between text-xs">
          <div className="truncate">
            {data.messages[data.messages.length - 1].message}
          </div>
          {readChat > 0 ? (
            <div className="rounded-full text-[10px] h-4 aspect-square text-white font-medium bg-orange flex justify-center items-center">
              {readChat}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
