/*
 *  import ant components
 */
import { Avatar, Menu, Layout } from "antd";
/*
 * import ant icons
 */
import { UserOutlined } from "@ant-design/icons";
const { Sider } = Layout;
/*
 *
 */
const SideMenu = ({ usersOnLine = [] }) => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
    >
      <div className="logo" />
      <Menu
        style={{ marginTop: "50px", padding: "2px" }}
        theme="dark"
        mode="inline"
      >
        {usersOnLine.map((user) => {
          return (
            <Menu.Item key={user.uId}>
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                }}
                icon={<UserOutlined />}
              />
              <span
                style={{
                  marginLeft: "15px",
                  color: "#87d068",
                  fontsize: "bold",
                }}
              >
                {user.nickname.toUpperCase()}
              </span>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};
/*
 *
 */
export default SideMenu;
