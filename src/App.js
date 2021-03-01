/*
 * react hook import
 */
import { useState, useEffect, useCallback } from "react";
/*
 * import socket library
 */
import socketIOClient from "socket.io-client";
/*
 *
 */
import "./App.css";
/**
 * import css from antDesign
 */
import "antd/dist/antd.css";
/*
 * import ant Components
 */
import { Layout, Input, Button, Form } from "antd";
import SideMenu from "./Componets/SideMenu";
import MessagesList from "./Componets/MessagesList";
import ModalForm from "./Componets/ModalForm";
import Column from "antd/lib/table/Column";
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;
/*
 *
 */
const fakeData = {
  usersOnLine: [
    { uId: 12341, nickname: "donato" },
    { uId: 12343, nickname: "rossella" },
  ],
  messages: [
    { msgType: "system", title: "Ant Design Title 1", message: "ciao a Tutti" },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ],
  isOpen: false,
  getNickname: (nickname) => {
    console.log(nickname);
  },
  sendMessage: (message) => {
    console.log(message);
  },
};
const ENDPOINT = "http://127.0.0.1:3333";

/*
 *
 */
function App() {
  const [webSocket, setWebSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [nickName, setNickname] = useState(null);
  const [usersOnline, setUsersOnline] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  /*
   *
   */
  const setSocket = useCallback(() => {
    const socket = socketIOClient(ENDPOINT);
    setWebSocket(socket);
    socket.emit("newUser", nickName);
    socket.on("currentUserOnline", (usersOnline) => {
      console.log(usersOnline);
      setUsersOnline(usersOnline);
    });
    socket.on("messageSystem", (messageSys) => {
      console.log("messaggio di sistema", messageSys);
      setMessagesList((prevState) => [...prevState, messageSys]);
    });
  });
  /**
   *
   * @param {*} evt
   */
  const handlerMessage = (evt) => {
    setMessage(evt.target.value);
  };
  const sendMessage = () => {
    webSocket.emit("messageToChat", message);
    setMessage("");
  };
  /*
   *
   */
  useEffect(() => {
    console.log("App useEffect");
  }, []);
  /*
   *
   */
  useEffect(() => {
    console.log("App useEffect", message);
  }, [message]);
  /*
   *
   */
  useEffect(() => {
    console.log("App useEffect", nickName);
    if (nickName) {
      setSocket();
    }
  }, [nickName]);
  /*
   *
   */
  return (
    <Layout>
      <ModalForm isOpen={nickName ? false : true} getNickname={setNickname} />
      <SideMenu usersOnLine={usersOnline} />
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              minHeight: "500px",
              overflow: "auto",
            }}
            className="site-layout-background"
          >
            <MessagesList messages={messagesList} />
            <Form onFinish={sendMessage}>
              <TextArea onChange={handlerMessage} value={message} rows={4} />
              <Button
                style={{ marginTop: "5px" }}
                htmlType="submit"
                type="primary"
              >
                Invia
              </Button>
            </Form>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
/*
 *
 */
export default App;
