import {
  AppstoreOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { TbReportSearch } from "react-icons/tb";

export const MenuDrawer = ({ modalCostumer, modalProvider, logout }) => {
  const items = [
    {
      key: "sub1",
      label: "Adicionar um Usuario",
      icon: <UserOutlined />,
      onClick: modalProvider,
    },
    {
      key: "sub2",
      label: "Adicionar um Cliente",
      icon: <UsergroupAddOutlined />,
      onClick: modalCostumer,
    },
    {
      type: "divider",
    },
    {
      type: "divider",
    },
    {
      key: "grp",
      label: "Sair",
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};
