import { LogoutOutlined, PieChartOutlined, UserAddOutlined } from "@ant-design/icons";
import { Popover, Avatar } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useAuthContext } from "../../../context/auth.context";

const AvatarUser = () => {
  const { currentUser, signOut } = useAuthContext();
  const route = useRouter();

  const content = (
    <div>
      <p onClick={() => route.push("/admin/dashboard")} style={{ cursor: "pointer" }}>
        <PieChartOutlined /> <span style={{ marginLeft: "0.5rem" }}>Dashboard</span>
      </p>
      <p onClick={() => route.push("/account")} style={{ cursor: "pointer" }}>
        <UserAddOutlined /> <span style={{ marginLeft: "0.5rem" }}>Account</span>
      </p>
      <p onClick={() => signOut()} style={{ cursor: "pointer" }}>
        <LogoutOutlined /> <span style={{ marginLeft: "0.5rem" }}>Sign Out</span>
      </p>
    </div>
  );
  return (
    <Popover placement="bottomLeft" title={currentUser?.username} content={content} trigger="click">
      {currentUser && <Avatar style={{ cursor: "pointer" }}>{currentUser?.username}</Avatar>}
    </Popover>
  );
};

export default AvatarUser;
