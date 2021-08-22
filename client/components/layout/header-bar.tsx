import { Badge, Col, Input, Layout, Row } from "antd";
import React, { FC } from "react";
import Link from "next/link";
import { useAuthContext } from "../../context/auth.context";
import SignInBtn from "./button/signIn-btn";
import SignUpBtn from "./button/signup-btn";
import AvatarUser from "./button/avatar-user";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useCartContext } from "../../context/carts.context";
import { useEffect } from "react";

const HeaderBar: FC = () => {
  const { currentUser } = useAuthContext();
  const route = useRouter();
  const handlerSearch = (values) => {
    route.push("/products");
  };
  const { cart } = useCartContext();
  useEffect(() => {}, [cart]);
  return (
    <Layout.Header style={{ background: "white", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", zIndex: 1 }}>
      <Row>
        <Col xs={6}>
          <h3>
            <b>
              <Link href="/">Common Shop</Link>
            </b>
          </h3>
        </Col>
        <Col xs={12} style={{ display: "flex", alignItems: "center" }}>
          <Input.Search bordered enterButton allowClear onSearch={handlerSearch} />
        </Col>
        <Col xs={6} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Badge count={cart.reduce((acc, curr) => acc + curr.qyt, 0)}>
            <ShoppingCartOutlined onClick={() => route.push("/cart")} style={{ fontSize: "1.5rem" }} />
          </Badge>
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
