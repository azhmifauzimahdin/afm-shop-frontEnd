import { FC, useEffect, useState } from "react";
import { ChatBox } from "../../../components";
import { DocumentTitle } from "../../../layouts";
import { Message } from "../../../types/chat";
import { chatAdminService } from "../../../services";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../../../redux/actions/errorMessage";

const Chat: FC = () => {
  DocumentTitle("Pesan");
  const [dataMessages, setDataMessages] = useState<Message[]>([]);
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
      const response = await chatAdminService.getAll();
      setDataMessages(response.data.data.messages);
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
      const response = await chatAdminService.getAll();
      setDataMessages(response.data.data.messages);
    } catch (error) {
      console.log(error);
      dispatch(setErrorMessage(["Terjadi Kesalahan"]));
    }
  };

  const handleReadMessage = async (userId: string) => {
    try {
      console.log("mulai");
      await chatAdminService.readChat(userId);
      console.log("selesai");
    } catch (error) {
      console.log(error);
      dispatch(setErrorMessage(["Terjadi kesalahan"]));
      getMessages();
    }
  };

  const handleSubmit = async (userId: string, message: string) => {
    dispatch(setErrorMessage([]));
    try {
      await chatAdminService.sendChat(userId, message);
      getNewMessages();
    } catch (error) {
      console.log(error);
      dispatch(setErrorMessage(["Terjadi kesalahan"]));
    }
  };

  return (
    <ChatBox
      data={dataMessages}
      handleOpenMessage={(userId: string) => handleReadMessage(userId)}
      handleSubmit={(userId: string, message: string) =>
        handleSubmit(userId, message)
      }
      loadingRender={loading}
      role="admin"
    />
  );
};

export default Chat;
