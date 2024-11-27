import { FC, useEffect, useRef, useState } from "react";

import { FaMagnifyingGlass } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import { VscSend } from "react-icons/vsc";
import InputGroup from "../Forms/InputGroup";
import ChatList from "./ChatList";
import ProgressiveImg from "../Image/ProgressiveImg";
import Chat from "./Chat";
import { ChatImage } from "../../assets";
import { Chat as ChatType, Message } from "../../types/chat";

interface InputProps {
  data: Message[];
  newData?: Message[];
  role: "admin" | "user";
  handleReadMessage: (userId: string) => any;
  handleSubmit: (userId: string, message: string) => any;
  newMessage: ChatType | undefined;
  loadingRender: boolean;
}

const ChatBox: FC<InputProps> = (props) => {
  const {
    data,
    role,
    handleReadMessage,
    handleSubmit,
    newMessage,
    loadingRender,
  } = props;
  const [dataMessage, setDataMessage] = useState<Message[]>([]);
  const [detailMessage, setDetailMessage] = useState<Message>();
  const [messageId, setMessageId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [chats, setChats] = useState<ChatType[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    initialData(data);
    if (messageId) {
      handleRefeshChat(messageId);
      handleReadMessage(userId);
    }
  }, [data]);

  useEffect(() => {
    if (!newMessage) return;
    setChats([...chats, newMessage]);
  }, [newMessage]);

  const initialData = (data: Message[]) => {
    setDataMessage(data);
  };

  const handleRefeshChat = (messageId: string) => {
    const message = dataMessage.filter((data) => data.id === messageId);
    setChats(message ? message[0].messages : []);
    setDetailMessage(message ? message[0] : undefined);
  };

  const handleShowChat = (messageId: string, userId: string) => {
    setMessageId(messageId);
    setUserId(userId);
    handleReadMessage(userId);
    const readChat = dataMessage.map((data) =>
      data.id === messageId ? { ...data, read_admin: 0, read_user: 0 } : data
    );
    initialData(readChat);

    const message = dataMessage.filter((data) => data.id === messageId);
    setDetailMessage(message ? message[0] : undefined);
    setChats(message ? message[0].messages : []);
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div
      className="flex justify-center items-center"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      <div
        className={`${
          role === "user" ? "w-3/4 mx-auto rounded-3xl" : "bg-white rounded-xl"
        } w-full h-[78vh] shadow border border-slate-100 overflow-hidden grid grid-cols-6`}
      >
        <div className="col-span-2 p-3 md:p-5 border-r border-slate-300 overflow-hidden">
          <h1 className="section_title text-xl font-medium mb-5">Pesan</h1>
          <form className="mb-3">
            <InputGroup
              type="search"
              id="search"
              name="search"
              placeholder="Cari pesan disini"
              prepend={<FaMagnifyingGlass className="text-lg text-slate-500" />}
            />
          </form>
          <div className="flex flex-col gap-3">
            {loadingRender ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <div className="flex gap-3 items-center" key={index}>
                    <div>
                      <Skeleton height={40} width={40} circle />
                    </div>
                    <div className="grow flex flex-col justify-center">
                      <Skeleton width={120} className="mb-1" />
                      <Skeleton />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              dataMessage.map((data, index) => (
                <ChatList
                  data={data}
                  role={role}
                  key={index}
                  onClick={(messageId: string, userId: string) =>
                    handleShowChat(messageId, userId)
                  }
                />
              ))
            )}
          </div>
        </div>
        <div
          className={`col-span-4 ${
            detailMessage ? "bg-slate-100" : ""
          } relative `}
        >
          {detailMessage ? (
            <>
              <div className="absolute top-0 left-0 w-full flex items-center gap-3 py-2 px-3 bg-white">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <ProgressiveImg
                    src={
                      role === "user"
                        ? detailMessage.admin.image_url
                        : detailMessage.user.image_url
                    }
                    className="w-full"
                    alt="User Image"
                  />
                </div>
                <div>
                  <h1 className="font-medium">
                    {role === "user"
                      ? detailMessage.admin.name
                      : detailMessage.user.name}
                  </h1>
                  <p className="text-xs">
                    Aktif 10 manit yang lalu############
                  </p>
                </div>
              </div>
              <div
                className="h-[78vh] pt-[64px] pb-[62px] overflow-auto hd-scroll"
                ref={messagesEndRef}
              >
                {chats.map((data, index) => {
                  const prevItem = chats[index - 1];

                  const isSameAsPrev =
                    prevItem?.date === data.date ? true : false;
                  return (
                    <Chat
                      key={index}
                      data={data}
                      type={`${
                        role === "user"
                          ? data.sent_by === "user"
                            ? "sender"
                            : "recipient"
                          : data.sent_by === "admin"
                          ? "sender"
                          : "recipient"
                      }`}
                      date={isSameAsPrev}
                    />
                  );
                })}
                <div ref={messagesEndRef}></div>
              </div>
              <form
                onSubmit={(e: any) => {
                  e.preventDefault();
                  const userId =
                    role === "user"
                      ? detailMessage.admin.id
                      : detailMessage.user.id;
                  handleSubmit(userId, message);
                  setMessage("");
                }}
                className="absolute bottom-0 left-0 w-full flex gap-3 bg-white px-3 py-2"
              >
                <InputGroup
                  type="text"
                  id="message"
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                {message !== "" ? (
                  <button
                    type="submit"
                    className="bg-orange text-white px-3 rounded-full"
                  >
                    <VscSend className="text-lg" />
                  </button>
                ) : null}
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className=" text-center">
                <ProgressiveImg src={ChatImage} className="w-1/4 mx-auto" />
                <h1 className="font-medium text-2xl mb-2">
                  Mari mulai obrolan!
                </h1>
                <p className="w-1/4 mx-auto">
                  Pilih pesan di samping untuk mulai chat.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
