import { FC, useEffect, useState } from "react";
import { ChatBox } from "../../../components";
import { DocumentTitle } from "../../../layouts";
import { Chat as ChatType, Message } from "../../../types/chat";
import { chatService } from "../../../services";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../../../redux/actions/errorMessage";

const Chat: FC = () => {
  DocumentTitle("Pesan");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<ChatType>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getNewMessages();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getMessages = async () => {
    setLoading(true);
    dispatch(setErrorMessage([]));
    try {
      const response = await chatService.getAll();
      setMessages(response.data.data.messages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      dispatch(setErrorMessage(["Terjadi Kesalahan"]));
      setLoading(false);
    }
  };

  const getNewMessages = async () => {
    dispatch(setErrorMessage([]));
    try {
      const response = await chatService.getAll();
      setMessages(response.data.data.messages);
    } catch (error) {
      console.log(error);
      dispatch(setErrorMessage(["Terjadi Kesalahan"]));
    }
  };

  const handleReadMessage = async (userId: string) => {
    try {
      await chatService.readChat(userId);
    } catch (error) {
      console.log(error);
      dispatch(setErrorMessage(["Terjadi kesalahan"]));
      getMessages();
    }
  };

  const handleSubmit = async (userId: string, message: string) => {
    dispatch(setErrorMessage([]));
    try {
      const response = await chatService.sendChat(userId, message);
      setNewMessage(response.data.data.messages);
    } catch (error) {
      console.log(error);
      dispatch(setErrorMessage(["Terjadi kesalahan"]));
    }
  };

  return (
    <ChatBox
      data={messages}
      handleReadMessage={(userId: string) => handleReadMessage(userId)}
      handleSubmit={(userId: string, message: string) =>
        handleSubmit(userId, message)
      }
      newMessage={newMessage}
      loadingRender={loading}
      role="user"
    />
  );
};

export default Chat;
