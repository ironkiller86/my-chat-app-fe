/*
 * react hook import
 */
import { useState, useEffect, useCallback, useRef } from "react";
/*
 * import socket library
 */
import socketIOClient from "socket.io-client";
import { SendOutlined } from "@ant-design/icons";
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

const { TextArea } = Input;
const { Header, Content, Footer } = Layout;
/*
 *
 */
const ENDPOINT =
  /*"http://127.0.0.1:3333";*/ "https://my-chat-app-v2.herokuapp.com";

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
  const messagesEndRef = useRef(null);
  /*
   *
   */
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  /*
   *
   */
  const setSocket = useCallback(() => {
    const socket = socketIOClient(ENDPOINT);
    setWebSocket(socket);
    socket.emit("newUser", nickName);
    socket.on("currentUserOnline", (usersOnline) => {
      setUsersOnline(usersOnline);
    });
    socket.on("messageSystem", (messageSys) => {
      setMessagesList((prevState) => [...prevState, messageSys]);
    });
  }, [nickName]);

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
  useEffect(() => {}, []);
  /*
   *
   */
  useEffect(() => {}, [message]);
  /**
   *
   */
  useEffect(() => {
    scrollToBottom();
  }, [messagesList]);
  /*
   *
   */
  useEffect(() => {
    if (nickName) {
      setSocket();
    }
  }, [nickName]);
  /*
   *
   */
  return (
    <Layout style={{ height: "100vh" }}>
      <ModalForm isOpen={nickName ? false : true} getNickname={setNickname} />
      <SideMenu usersOnLine={usersOnline} />
      <Layout style={{ backgroundColor: "lightgray" }}>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {nickName ? `Benvenuto ${nickName}` : null}
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            height: "300px",
            overflowY: "scroll",
            backgroundColor: "gray",
          }}
        >
          <MessagesList messages={messagesList} />
          <div ref={messagesEndRef} />
        </Content>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px 10px",
          }}
          onFinish={sendMessage}
        >
          <TextArea
            style={{
              borderRadius: "10px",
              maxWidth: "400px",
              border: "1px solid gray",
            }}
            onChange={handlerMessage}
            value={message}
            rows={1}
          />
          <Button
            icon={<SendOutlined />}
            size={"default"}
            style={{
              marginTop: "5px",
              marginLeft: "10px",
            }}
            htmlType="submit"
            type="primary"
          >
            Invia
          </Button>
        </Form>
        <Footer style={{ textAlign: "center" }}>
          My-Chat by
          <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
            Tuzzolino Donato
          </span>
        </Footer>
      </Layout>
    </Layout>
  );
}
/*
 *
 */
export default App;
