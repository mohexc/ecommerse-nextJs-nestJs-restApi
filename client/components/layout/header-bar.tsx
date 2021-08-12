import { Col, Layout, Row } from "antd";
import React, { FC } from "react";
import Link from "next/link";
import { useAuthContext } from "../../context/auth.context";
import SignInBtn from "./button/signIn-btn";
import SignUpBtn from "./button/signup-btn";
import AvatarUser from "./button/avatar-user";

const HeaderBar: FC = () => {
  const { currentUser } = useAuthContext();

  return (
    <Layout.Header style={{ background: "white", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", zIndex: 1 }}>
      <Row>
        <Col xs={6}>
          <h3>
            <b>
              <Link href="/">BACK OFFICE</Link>
            </b>
          </h3>
        </Col>
        <Col xs={12}></Col>
        <Col xs={6} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          {currentUser ? (
            <AvatarUser />
          ) : (
            <>
              <SignInBtn />|<SignUpBtn />
            </>
          )}
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default HeaderBar;
