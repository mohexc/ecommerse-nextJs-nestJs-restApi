import { Col, Rate, Row } from "antd";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface PropsInterface {
  product: ProductItem;
}

interface ProductItem {
  id: number;
  name: string;
  title: string;
  description: string;
  images: string[];
  video: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
}

const ProductCard: FC<PropsInterface> = ({ product }) => {
  const route = useRouter();

  return (
    <div
      onClick={() => route.push(`/products/${product.id}`)}
      style={{ border: "2px solid black", borderRadius: "0.5rem", cursor: "pointer" }}
    >
      <img src={product.images[0]} style={{ height: 300, width: "100%", borderRadius: "0.5rem" }} />
      <div style={{ padding: "0.5rem" }}>
        <h4>
          <b>{product.name}</b>
        </h4>
        <h3>
          <b>${product.price}</b>
        </h3>
        <Row gutter={16}>
          <Col xs={14}>
            <Rate allowHalf defaultValue={5} />
            <p>100 Sales</p>
          </Col>
          <Col xs={10}></Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductCard;
