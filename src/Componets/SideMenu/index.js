/*
 *  import ant components
 */
import { Menu, Layout } from "antd";
/*
 * import ant icons
 */
import { UserOutlined } from "@ant-design/icons";
const { Sider } = Layout;
/*
 *
 */
const SideMenu = ({ usersOnLine = [] }) => {
  //  console.log("SideMenu", usersOnLine);
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" /*defaultSelectedKeys={["4"]}*/>
        {usersOnLine.map((user) => {
          return (
            <Menu.Item key={user.uId} icon={<UserOutlined />}>
              {user.nickname}
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
