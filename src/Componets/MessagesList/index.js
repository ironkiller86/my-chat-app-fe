/*
 *  import ant components
 */
import { List, Avatar } from "antd";
import alert from "../../assets/alert.png";
/*
 *
 */
const MessagesList = ({ messages = [] }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              item?.msgType === "system" ? (
                <img alt="new Message" src={alert} />
              ) : (
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              )
            }
            title={item?.title}
            description={
              <span style={{ color: "white" }}>{item?.message}</span>
            }
          />
        </List.Item>
      )}
    />
  );
};
export default MessagesList;
