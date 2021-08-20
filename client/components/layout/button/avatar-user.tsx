import { LogoutOutlined, PieChartOutlined, UserAddOutlined } from "@ant-design/icons";
import { Popover, Avatar, Row } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useAuthContext } from "../../../context/auth.context";

const AvatarUser = () => {
  const { currentUser, signOut } = useAuthContext();
  const route = useRouter();

  const content = (
    <div>
      {currentUser.role === "admin" && (
        <p onClick={() => route.push("/admin/dashboard")} style={{ cursor: "pointer" }}>
          <PieChartOutlined /> <span style={{ marginLeft: "0.5rem" }}>Dashboard</span>
        </p>
      )}
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
      {currentUser && (
        <Row align="middle">
          <Avatar style={{ cursor: "pointer", marginLeft: "2rem" }}>
            {currentUser?.username.charAt(0).toUpperCase()}
          </Avatar>
          <span style={{ marginLeft: "1rem" }}>{currentUser?.username}</span>
        </Row>
      )}
    </Popover>
  );
};

export default AvatarUser;
