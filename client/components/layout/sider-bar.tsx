import {
  InboxOutlined,
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import React, { FC } from "react";

const SiderBar: FC = () => {
  const router = useRouter();
  const handleClick = ({ item, key, keyPath, domEvent }) => {
    key === "Dashbord" && router.push("/admin/dashboard");
    key === "Users" && router.push("/admin/users");
    key === "Products" && router.push("/admin/products");
    key === "Cart" && router.push("/admin/cart");
    key === "Orders" && router.push("/admin/orders");
    key === "Setting" && router.push("/admin/setting");
  };
  return (
    <Layout.Sider theme="light">
      <Menu theme="light" onClick={handleClick}>
        <Menu.Item key="Dashbord" icon={<AreaChartOutlined />}>
          Dashbord
        </Menu.Item>
        <Menu.Item key="Users" icon={<UserOutlined />}>
          User
        </Menu.Item>
        <Menu.Item key="Products" icon={<InboxOutlined />}>
          Products
        </Menu.Item>
        <Menu.Item key="Cart" icon={<ShoppingCartOutlined />}>
          Cart
        </Menu.Item>
        <Menu.Item key="Orders" icon={<ShoppingOutlined />}>
          Orders
        </Menu.Item>
        <Menu.Item key="Setting" icon={<SettingOutlined />}>
          Setting
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default SiderBar;
