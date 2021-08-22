import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import React from "react";
import { FC } from "react";
import { useCartContext } from "../../context/carts.context";
import { Product } from "../../context/products.context";

interface PropsInterface {
  cartItem: {
    product: Product;
    qyt: number;
  };
}

const CartItem: FC<PropsInterface> = ({ cartItem }) => {
  const { addCartItem, removeCratItem } = useCartContext();
  return (
    <Card>
      <Row>
        <Col xs={4}>
          <img src={cartItem.product.images[0]} height={100} />
        </Col>
        <Col xs={4}>
          <span>
            <b>{cartItem.product.name}</b>
          </span>
        </Col>
        <Col xs={4}>
          <span>
            <b>{cartItem.product.price}</b>
          </span>
        </Col>
        <Col xs={4}>
          <Row align="middle">
            <MinusCircleOutlined style={{ fontSize: "1.5rem" }} onClick={() => removeCratItem(cartItem.product)} />
            <p style={{ marginLeft: "1rem", marginRight: "1rem" }}>qyt : {cartItem.qyt}</p>
            <PlusCircleOutlined style={{ fontSize: "1.5rem" }} onClick={() => addCartItem(cartItem.product)} />
          </Row>
        </Col>
        <Col xs={6}>
          {(() => {
            const totalPrice = cartItem.product.price * cartItem.qyt;
            return totalPrice.toFixed(2);
          })()}
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
