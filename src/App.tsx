import { useSelector } from "react-redux";
import "./App.css";
import Router from "./Routes";
import { Alert } from "./components";

function App() {
  const message = useSelector((state: any) => state.message.message);
  const errorMessage = useSelector(
    (state: any) => state.errorMessage.errorMessage
  );

  return (
    <>
      <Alert type="success" hidden={message ? false : true}>
        {message}
      </Alert>
      <Alert type="danger" hidden={errorMessage.length > 0 ? false : true}>
        {errorMessage}
      </Alert>
      <Router />
    </>
  );
}

export default App;
