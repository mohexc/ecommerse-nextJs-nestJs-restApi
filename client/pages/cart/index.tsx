import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Card, Typography, Row, Col, Button } from "antd";
import React from "react";
import { FC } from "react";
import CartItem from "../../components/cart/cart-item";
import { useCartContext } from "../../context/carts.context";

const CratPage: FC = () => {
  const { cart } = useCartContext();
  const totalPriceCart = cart.reduce((acc, curr) => {
    const priceProductTotal = curr.product.price * curr.qyt;
    return acc + priceProductTotal;
  }, 0);
  return (
    <div style={{ width: 1200, margin: "auto" }}>
      <Card style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Typography.Title level={3}>CratPage</Typography.Title>
      </Card>
      {cart.map((cartItem) => (
        <CartItem cartItem={cartItem} />
      ))}
      <Card style={{ marginTop: "1rem" }}>
        <Row>
          <Col xs={20}>{totalPriceCart.toFixed(2)}</Col>
          <Col xs={4}>
            <Button type="primary">Checkout</Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CratPage;
